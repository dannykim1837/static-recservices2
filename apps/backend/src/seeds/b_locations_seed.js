/*
==============================================
  ✅ LOCATIONS SEED FILE (locations_seed.js)
  - Populates the locations table with test data
  - Ensures consistent initial dataset for testing
==============================================
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  console.log("🔹 Seeding locations table...");

  // ✅ Deletes ALL existing entries before inserting new ones
  await knex("locations").del();

  // ✅ Inserts predefined locations
  await knex("locations").insert([
    {
      location_id: 1,
      location_name: "Main Office",
      employee_count: 10,
      physical_address: "123 University Blvd, City, ST 12345",
    },
  ]);

  console.log("✅ Locations table seeded successfully!");
}
