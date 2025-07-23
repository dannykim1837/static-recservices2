/*
==============================================
  ✅ EMPLOYEES TABLE MIGRATION (ES Modules)
  - Defines the schema for the "employees" table
  - Uses ES Modules for consistency across the project
==============================================
*/

/**
 * Runs the migration to create the "employees" table.
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable("employees", (table) => {
      table.increments("employee_id").primary();
      table.uuid("user_id").nullable(); // Supabase user UUID
      table.string("first_name", 45).notNullable();
      table.string("last_name", 45).notNullable();
      table.string("phone_number", 15);
      table.string("email", 100).unique().notNullable();
      table.integer("position_id").unsigned().references("positions.position_id").onDelete("SET NULL");
      table.integer("location_id").unsigned().references("locations.location_id").onDelete("SET NULL");
      table.boolean("is_hourly").notNullable().defaultTo(true);
      table.boolean("is_salaried").notNullable().defaultTo(false);
      table.boolean("is_active").notNullable().defaultTo(true);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  
    console.log("✅ Employees table created successfully!");
  }
  
  /**
   * Rolls back the migration by dropping the "employees" table.
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    await knex.schema.dropTable("employees");
    console.log("⚠️ Employees table dropped!");
  }
  