import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return await knex("services")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("services").insert([
        { type: "Alimentação", image: "alimentacao.svg" },
        { type: "Automotivo", image: "automotivo.svg" },
        { type: "Beleza", image: "beleza.svg" },
        { type: "Limpeza", image: "limpeza.svg" },
        { type: "Mercado", image: "mercado.svg" },
        { type: "Papelaria", image: "papelaria.svg" },
        { type: "Pet", image: "pet.svg" },
        { type: "Saúde", image: "saude.svg" },
        { type: "Serviços Gerais", image: "servicosGerais.svg" },
      ]);
    });
}
