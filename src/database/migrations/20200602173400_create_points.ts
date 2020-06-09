import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("points", (table) => {
    table.increments("id").primary();

    table.string("image").notNullable();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.string("site").nullable();
    table.string("city").notNullable();
    table.string("uf", 2).notNullable();
    table.decimal("latitude").notNullable();
    table.decimal("longitude").notNullable();
    table.integer("services_id").unsigned().notNullable;
    table.foreign("services_id").references("id").inTable("services");
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("points");
}
