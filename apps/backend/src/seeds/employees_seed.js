/*
==============================================
  ✅ EMPLOYEES SEED FILE (employees_seed.js)
  - Populates the employees table with test data
  - Ensures consistent initial dataset for testing
  - Uses ES Modules (ESM) format
==============================================
*/

export async function seed(knex) {
  console.log("🔹 Seeding employees table...");

  // ✅ Deletes ALL existing entries before inserting new ones
  await knex("employees").del();

  // ✅ Inserts predefined employee data
  await knex("employees").insert([
    {
      user_id: "6e18acb5-fc9c-11ef-a6dc-0242ac110002",
      first_name: "Alice",
      last_name: "Johnson",
      phone_number: "123-456-7890",
      email: "alice@example.com",
      position_id: 1,
      location_id: 1,
      is_hourly: true,
      is_salaried: false,
      is_active: true,
    },
    {
      user_id: "6e1900eb-fc9c-11ef-a6dc-0242ac110002",
      first_name: "Bob",
      last_name: "Smith",
      phone_number: "555-555-5555",
      email: "bob@example.com",
      position_id: 2,
      location_id: 1,
      is_hourly: false,
      is_salaried: true,
      is_active: true,
    },
    {
      user_id: "6e190d1f-fc9c-11ef-a6dc-0242ac110002",
      first_name: "Charlie",
      last_name: "Brown",
      phone_number: "987-654-3210",
      email: "charlie@example.com",
      position_id: 3,
      location_id: 1,
      is_hourly: true,
      is_salaried: false,
      is_active: true,
    },
    {
      user_id: "6e190e12-fc9c-11ef-a6dc-0242ac110002",
      first_name: "Dana",
      last_name: "White",
      phone_number: "777-777-7777",
      email: "dana@example.com",
      position_id: 4,
      location_id: 1,
      is_hourly: false,
      is_salaried: true,
      is_active: true,
    },
    {
      user_id: "6e190e50-fc9c-11ef-a6dc-0242ac110002",
      first_name: "Eve",
      last_name: "Taylor",
      phone_number: "444-123-9876",
      email: "eve@example.com",
      position_id: 1,
      location_id: 1,
      is_hourly: true,
      is_salaried: false,
      is_active: false, // 🔹 Inactive
    },
    {
      user_id: "6e190eb8-fc9c-11ef-a6dc-0242ac110002",
      first_name: "Frank",
      last_name: "Green",
      phone_number: "333-444-5555",
      email: "frank@example.com",
      position_id: 3,
      location_id: 1,
      is_hourly: true,
      is_salaried: false,
      is_active: true,
    },
    {
      user_id: "6e190f05-fc9c-11ef-a6dc-0242ac110002",
      first_name: "Grace",
      last_name: "Lee",
      phone_number: "222-999-8888",
      email: "grace@example.com",
      position_id: 4,
      location_id: 1,
      is_hourly: false,
      is_salaried: true,
      is_active: true,
    },
    {
      user_id: "6e190f33-fc9c-11ef-a6dc-0242ac110002",
      first_name: "Hank",
      last_name: "Miller",
      phone_number: "666-777-8888",
      email: "hank@example.com",
      position_id: 2,
      location_id: 1,
      is_hourly: true,
      is_salaried: false,
      is_active: true,
    },
    {
      user_id: "6e190f5f-fc9c-11ef-a6dc-0242ac110002",
      first_name: "Ivy",
      last_name: "Lopez",
      phone_number: "111-222-3333",
      email: "ivy@example.com",
      position_id: 3,
      location_id: 1,
      is_hourly: false,
      is_salaried: true,
      is_active: false, // 🔹 Inactive
    },
    {
      user_id: "6e190f8a-fc9c-11ef-a6dc-0242ac110002",
      first_name: "Jack",
      last_name: "Davis",
      phone_number: "555-666-7777",
      email: "jack@example.com",
      position_id: 1,
      location_id: 1,
      is_hourly: true,
      is_salaried: false,
      is_active: true,
    },
    {
      user_id: "6e190fb2-fc9c-11ef-a6dc-0242ac110002",
      first_name: "Karen",
      last_name: "Wilson",
      phone_number: "999-888-7777",
      email: "karen@example.com",
      position_id: 2,
      location_id: 1,
      is_hourly: false,
      is_salaried: true,
      is_active: true,
    },
    {
      user_id: "6e190fda-fc9c-11ef-a6dc-0242ac110002",
      first_name: "Leo",
      last_name: "Evans",
      phone_number: "777-888-9999",
      email: "leo@example.com",
      position_id: 3,
      location_id: 1,
      is_hourly: true,
      is_salaried: false,
      is_active: true,
    }
  ]);

  console.log("✅ Employees seeded successfully!");
}
