import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("services", (table) => {
    table.increments("id").primary();
    table.string("type").notNullable();
    table.string("image").notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("services");
}
