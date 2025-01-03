
import { createClient } from "@/utils/supabase/client"


export async function getCurrentUser() {
  const supabase = createClient();
  const {data : { session }} = await (await supabase).auth.getSession();

  return session?.user
}

export async function getSites(userId: string) {
  const supabase = createClient();
  const { data, error } = await (await supabase).from('domains').select('domain').eq('user_id', userId);

  if (error) {
    console.error("Error fetching sites:", error);
    return [];
  }

  if(data.length === 0) {
    return [];
  }
  return [{id: data[0].domain}];
}