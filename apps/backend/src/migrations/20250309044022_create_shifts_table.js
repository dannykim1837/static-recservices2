/*
==============================================
  ✅ SHIFTS TABLE MIGRATION (ES Modules)
  - Defines the schema for the "shifts" table
  - Uses ES Modules for consistency across the project
==============================================
*/

/**
 * Runs the migration to create the "shifts" table.
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable("shifts", (table) => {
      table.increments("shift_id").primary();
      table
        .integer("employee_id")
        .unsigned()
        .notNullable()
        .references("employees.employee_id")
        .onDelete("CASCADE"); // 🔹 Deletes shifts if employee is removed
  
      table.dateTime("shift_start").notNullable();
      table.dateTime("shift_end").notNullable();
      table.boolean("is_up_for_trade").notNullable().defaultTo(false);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  
    console.log("✅ Shifts table created successfully!");
  }
  
  /**
   * Rolls back the migration by dropping the "shifts" table.
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    await knex.schema.dropTable("shifts");
    console.log("⚠️ Shifts table dropped!");
  }
  