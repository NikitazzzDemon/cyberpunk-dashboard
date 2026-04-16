import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createSupabaseAdmin } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const telegramId = cookieStore.get("tg_user_id")?.value;
  const boundUser = cookieStore.get("bound_user")?.value;

  if (!telegramId || !boundUser) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("file");
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "software";
  const ttl = Number(process.env.SUPABASE_SIGNED_URL_TTL || 90);

  if (!filePath) {
    return NextResponse.json({ error: "Missing file query parameter" }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(filePath, ttl);

  if (error || !data?.signedUrl) {
    return NextResponse.json(
      { error: error?.message ?? "Unable to generate signed URL" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    signedUrl: data.signedUrl,
    expiresIn: ttl
  });
}
