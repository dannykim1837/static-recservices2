

// Used for connection between Express and Supabase



import { supabase } from "../database/supabase.js"; // import supabase

// These 2 lines may be no longer needed
const dbState = "supabase";
const useExternalDB = true; // always true now since we're using Supabase

// ✅ Supabase version of dbQuery
const dbQuery = async (table, method, data = {}) => {
  let response;

  switch (method) {
    case "selectAll":
      response = await supabase.from(table).select("*");
      break;

    case "selectOne":
      response = await supabase
        .from(table)
        .select("*")
        .eq(data.idField, data.id)
        .single();
      break;

    case "insert":
      response = await supabase
        .from(table)
        .insert([data.record])
        .select()
        .single();
      break;

    case "update":
      response = await supabase
        .from(table)
        .update(data.record)
        .eq(data.idField, data.id)
        .select()
        .single();
      break;

    case "delete":
      response = await supabase
        .from(table)
        .delete()
        .eq(data.idField, data.id);
      return response.error ? 0 : 1;

    default:
      throw new Error(`Unsupported method: ${method}`);
  }

  if (response.error) throw response.error;
  return response.data;
};

export { dbQuery, useExternalDB, dbState };
