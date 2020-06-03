import { Request, Response } from "express";
import knex from "../database/connection";

class ServicesController {
  async index(request: Request, response: Response) {
    const services = await knex("services").select("*");

    const serializedServices = services.map((service) => {
      return {
        id: service.id,
        name: service.type,
        image_url: `http://localhost:3333/uploads/${service.image}`,
      };
    });

    return response.json(serializedServices);
  }
}

export default ServicesController;
