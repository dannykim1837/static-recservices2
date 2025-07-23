/*
==============================================
  ✅ AUTH USERS SEED FILE (auth_users_seed.js)
  - Creates mock user accounts for local testing
  - Uses static UUIDs so employees can reference them
==============================================
*/

export async function seed(knex) {
    console.log("🔹 Seeding auth.users table...");
  
    // ✅ Deletes ALL existing entries before inserting new ones
    await knex("auth.users").del();
  
    // ✅ Inserts predefined user accounts
    await knex("auth.users").insert([
      { id: "6e18acb5-fc9c-11ef-a6dc-0242ac110002", email: "alice@example.com" },
      { id: "6e1900eb-fc9c-11ef-a6dc-0242ac110002", email: "bob@example.com" },
      { id: "6e190d1f-fc9c-11ef-a6dc-0242ac110002", email: "charlie@example.com" },
      { id: "6e190e12-fc9c-11ef-a6dc-0242ac110002", email: "dana@example.com" },
      { id: "6e190e50-fc9c-11ef-a6dc-0242ac110002", email: "eve@example.com" },
      { id: "6e190eb8-fc9c-11ef-a6dc-0242ac110002", email: "frank@example.com" },
      { id: "6e190f05-fc9c-11ef-a6dc-0242ac110002", email: "grace@example.com" },
      { id: "6e190f33-fc9c-11ef-a6dc-0242ac110002", email: "hank@example.com" },
      { id: "6e190f5f-fc9c-11ef-a6dc-0242ac110002", email: "ivy@example.com" },
      { id: "6e190f8a-fc9c-11ef-a6dc-0242ac110002", email: "jack@example.com" },
      { id: "6e190fb2-fc9c-11ef-a6dc-0242ac110002", email: "karen@example.com" },
      { id: "6e190fda-fc9c-11ef-a6dc-0242ac110002", email: "leo@example.com" },
    ]);
  
    console.log("✅ auth.users table seeded successfully!");
  }
  