import { SupabaseClient } from "@supabase/supabase-js";

export const deployDataForNewDomain = async (supabase : SupabaseClient, encodedData: Text, domain: string) => {
    const {data : { user}} = await  supabase.auth.getUser();
    const userId = user.id;
    // const domain = await getDomainForUser(supabase,userId);

    if(!domain) {
        console.error("No domain found for user", userId);
        return null;
    }
    
    // console.log("Data: ", encodedData)
    const { error: dataError } = await supabase
      .from('deployed_data')
      .upsert([{ domain: domain, encoded_data: encodedData }]);
  
    if (dataError) {
      console.error("Error storing deployed data:", dataError);
    } else {
      console.log("Data deployed successfully for", domain);
    }
    return domain;
  };
  

  // const getDomainForUser = async (supabase: SupabaseClient ,userId: string) => {
  //   const { data, error } = await supabase
  //     .from('domains')
  //     .select('domain')
  //     .eq('user_id', userId)
  //     .maybeSingle();  // We expect only one result, as user_id is unique
  
  //   if (error) {
  //     console.error("Error fetching domain for user:", error);
  //     return null;  // Handle the error (e.g., user not found, etc.)
  //   }
  
  //   return data ? data.domain : null;  // Return the domain if found
  // };


  export const checkIfDomainExists = async (supabase: SupabaseClient, selectedDomain: string) => {
    const { data, error } = await supabase
      .from('domains')
      .select('domain')
      .eq('domain', selectedDomain)
      .maybeSingle();  // Use maybeSingle instead of single
  

      console.log("Data", data);
    if (error) {
      console.error("Error checking domain:", error);
      return true;  // Return true if there was an error (i.e., domain checking failed)
    }
  
    if (data) {
      return true;  // Domain exists
    }
  
    return false;  // Domain doesn't exist
  };
  

export const insertDomainToDatabase = async (supabase: SupabaseClient , selectedDomain: string) => {
    const { data: {user} } = await supabase.auth.getUser();  // Get the current logged-in user

    if (!user) {
      console.error("User not found.");
      return false;
    }
  
    const { error: insertError } = await supabase
      .from('domains')
      .insert([{ user_id: user.id, domain: selectedDomain }]);
  
    if (insertError) {
      console.error("Error inserting domain:", insertError);
      // Handle insertion error if needed
      return false;
    }
    console.log("Domain successfully inserted:", selectedDomain);
    return true;
  };


  export const updateDomainToDatabase = async (supabase: SupabaseClient , selectedDomain: string, oldDomain:string) => {
    const { data: {user} } = await supabase.auth.getUser();  // Get the current logged-in user
    const {data : idData, error: idError} = await supabase.from('domains').select('id').eq('domain', oldDomain).single();

    if(idError) {
        console.error("Error fetching id for domain", oldDomain);
        return false;
    }
    if (!user) {
      console.error("User not found.");
      return false;
    }
  
    const { error: upsertError } = await supabase
      .from('domains')
      .upsert([{ id: idData.id, user_id: user.id, domain: selectedDomain }]);
  
    if (upsertError) {
      console.error("Error upserting domain:", upsertError);
      // Handle insertion error if needed
      return false;
    }

    const { error: deployedError } = await supabase
    .from('deployed_data')
    .update({ domain: selectedDomain })
    .eq('domain', oldDomain);

    if (deployedError) {
      console.error("Error updating deployed data:", deployedError);
      return false;
    }
    console.log("Domain successfully inserted:", selectedDomain);
    return true;
  };