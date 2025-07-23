/*
==============================================
  ✅ POSITIONS TABLE MIGRATION (ES Modules)
  - Defines the schema for the "positions" table
  - Uses ES Modules for consistency across the project
==============================================
*/

/**
 * Runs the migration to create the "positions" table.
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable("positions", (table) => {
      table.increments("position_id").primary();
      table.string("position_name", 45).notNullable();
      table.integer("position_count");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  
    console.log("✅ Positions table created successfully!");
  }
  
  /**
   * Rolls back the migration by dropping the "positions" table.
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    await knex.schema.dropTable("positions");
    console.log("⚠️ Positions table dropped!");
  }
  