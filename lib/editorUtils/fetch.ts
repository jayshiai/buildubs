import { createClient } from "@/utils/supabase/client";
export const getSiteData = async (domain: string) => {
    const supabase =  createClient();

    const { data, error } = await supabase
    .from('deployed_data') 
    .select('encoded_data') 
    .eq('domain', domain.split(".")[0])
    .single(); 
// console.log("DATA:", data);
  if (error || !data) {
    return null;
  }

 
  return data.encoded_data;
  // Now, decode the MessagePack data
  // try {
  //     const decodedData = msgpack.decode(uint8Array);
  //     console.log("Decoded Data:", decodedData);
  //     return decodedData;
  // } catch (decodeError) {
  //     console.error("Error decoding data:", decodeError);
  //     return null;
  // }
}