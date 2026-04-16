import { NextResponse } from "next/server";

import { createSupabaseAdmin } from "@/lib/supabase/admin";

type TelegramWebhookUpdate = {
  message?: {
    text?: string;
    chat?: { id: number };
    from?: { id: number; username?: string };
  };
};

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    return NextResponse.json({ error: "TELEGRAM_BOT_TOKEN is missing" }, { status: 500 });
  }

  const update = (await request.json()) as TelegramWebhookUpdate;
  const text = update.message?.text ?? "";
  if (!text.startsWith("/start")) {
    return NextResponse.json({ ok: true });
  }

  const token = text.split(" ")[1];
  if (!token) {
    return NextResponse.json({ ok: true });
  }

  const telegramId = update.message?.from?.id;
  const telegramUsername = update.message?.from?.username ?? null;
  const chatId = update.message?.chat?.id;

  if (!telegramId || !chatId) {
    return NextResponse.json({ ok: true });
  }

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("telegram_auth_tokens")
    .select("status, expires_at")
    .eq("token", token)
    .maybeSingle();

  if (error || !data) {
    await sendBotMessage(botToken, chatId, "Token not found.");
    return NextResponse.json({ ok: true });
  }

  const isExpired = new Date(data.expires_at).getTime() <= Date.now();
  if (isExpired || data.status !== "pending") {
    await sendBotMessage(botToken, chatId, "Token expired or already used.");
    return NextResponse.json({ ok: true });
  }

  const { error: updateError } = await supabase
    .from("telegram_auth_tokens")
    .update({
      status: "confirmed",
      telegram_id: telegramId,
      telegram_username: telegramUsername,
      confirmed_at: new Date().toISOString()
    })
    .eq("token", token)
    .eq("status", "pending");

  if (updateError) {
    await sendBotMessage(botToken, chatId, "Verification failed. Try again.");
    return NextResponse.json({ ok: true });
  }

  await sendBotMessage(botToken, chatId, "Account linked. Return to website.");
  return NextResponse.json({ ok: true });
}

const sendBotMessage = async (botToken: string, chatId: number, text: string) => {
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text })
  });
};
