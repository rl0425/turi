import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function AuthCallbackPage() {
  const supabase = createServerComponentClient({ cookies });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      redirect("/");
    }
  } catch (error) {
    console.error("Auth callback error:", error);
    redirect("/auth/login?error=auth");
  }

  return null;
}
