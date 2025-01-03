import { createClient as serverClient } from "@/utils/supabase/server";

export async function getCurrentUserServer() {
  const supabase = serverClient();
  const {data : { session }} = await (await supabase).auth.getSession();

  return session?.user
}