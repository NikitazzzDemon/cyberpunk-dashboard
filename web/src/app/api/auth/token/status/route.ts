import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createSupabaseAdmin } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("telegram_auth_tokens")
    .select("status, telegram_id, telegram_username, expires_at")
    .eq("token", token)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ status: "not_found" }, { status: 404 });
  }

  const isExpired = new Date(data.expires_at).getTime() <= Date.now();
  if (isExpired) {
    return NextResponse.json({ status: "expired" });
  }

  if (data.status === "confirmed" && data.telegram_id) {
    const cookieStore = await cookies();
    cookieStore.set("tg_user_id", String(data.telegram_id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24
    });

    return NextResponse.json({
      status: "confirmed",
      telegramId: data.telegram_id,
      telegramUsername: data.telegram_username ?? null
    });
  }

  return NextResponse.json({ status: "pending" });
}
