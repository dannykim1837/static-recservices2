


import supabase from "../../db/supabase.js";

// Get information about each row from the Employee table
export async function getEmployees() {
  try {
      const { data, error } = await supabase
        .from('Employee')
        .select('firstName');

      if (error) throw error;

      console.log(data); // print to the console --- REMOVE before publishing
      return data;
  }
  catch (err) {
    console.error("Error fetching employees:", err);
    return [];
  }
}
getEmployees();