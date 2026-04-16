import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";

import { createSupabaseAdmin } from "@/lib/supabase/admin";

type BindPayload = {
  username: string;
  password: string;
};

export async function POST(request: Request) {
  try {
    const { username, password } = (await request.json()) as BindPayload;
    const cookieStore = await cookies();
    const telegramId = cookieStore.get("tg_user_id")?.value;

    if (!telegramId) {
      return NextResponse.json({ error: "Telegram session is missing" }, { status: 401 });
    }

    if (!username || username.length < 3) {
      return NextResponse.json({ error: "Username is too short" }, { status: 400 });
    }

    if (!password || password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 chars" }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.scryptSync(password, salt, 64).toString("hex");
    const passwordHash = `${salt}:${hash}`;

    const { error } = await supabase.from("user_credentials").upsert({
      telegram_id: Number(telegramId),
      username,
      password_hash: passwordHash
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    cookieStore.set("bound_user", username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
