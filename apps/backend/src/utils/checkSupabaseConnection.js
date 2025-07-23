// Utility to check Supabase connection for a table and log result
export async function checkSupabaseConnection(supabase, table, idField) {
  try {
    const { error } = await supabase.from(table).select(idField).limit(1);
    if (error) {
      console.error(
        `❌ Failed to connect to Supabase for ${table}:`,
        error.message
      );
    } else {
      console.log(`✅ Using Supabase for ${table}`);
    }
  } catch (err) {
    console.error(
      `❌ Failed to connect to Supabase for ${table}:`,
      err.message
    );
  }
}
