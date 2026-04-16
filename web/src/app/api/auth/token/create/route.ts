import crypto from "crypto";
import { NextResponse } from "next/server";

import { createSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST() {
  const botUsername = process.env.TELEGRAM_BOT_USERNAME;
  if (!botUsername) {
    return NextResponse.json({ error: "TELEGRAM_BOT_USERNAME is missing" }, { status: 500 });
  }

  const supabase = createSupabaseAdmin();
  const token = crypto.randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  const { error } = await supabase.from("telegram_auth_tokens").insert({
    token,
    status: "pending",
    expires_at: expiresAt
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    token,
    botLink: `https://t.me/${botUsername}?start=${token}`,
    expiresAt
  });
}
