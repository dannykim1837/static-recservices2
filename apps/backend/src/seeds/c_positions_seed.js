/*
==============================================
  ✅ POSITIONS SEED FILE (positions_seed.js)
  - Populates the positions table with test data
  - Ensures consistent initial dataset for testing
==============================================
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  console.log("🔹 Seeding positions table...");

  // ✅ Deletes ALL existing entries before inserting new ones
  await knex("positions").del();

  // ✅ Inserts predefined positions
  await knex("positions").insert([
    { position_id: 1, position_name: "Manager", position_count: 2 },
    { position_id: 2, position_name: "Cashier", position_count: 5 },
    { position_id: 3, position_name: "Technician", position_count: 3 },
    { position_id: 4, position_name: "Supervisor", position_count: 2 },
  ]);

  console.log("✅ Positions table seeded successfully!");
}
