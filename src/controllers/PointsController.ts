import { Request, Response } from "express";
import knex from "../database/connection";

//TODO criar um repository e um Service para esse controller
class PointsControler {
  async store(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      services_id,
    } = request.body;

    const point = {
      image:
        "https://images.unsplash.com/photo-1562967915-6ba607ff7d05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      services_id,
    };

    const insertedID = await knex("points").insert(point);

    const point_id = insertedID[0];

    return response.json({ id: point_id, ...point });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const pointQuery = await knex("points").where("id", id).first();

    if (!pointQuery) {
      return response.status(400).json({ message: "Point not Found" });
    }

    const service = await knex("services")
      .where("id", pointQuery.services_id)
      .first();

    const {
      image,
      name,
      email,
      whatsap,
      latitude,
      longitude,
      city,
      uf,
      services_id,
    } = pointQuery;

    const point = {
      id: Number(id),
      image,
      name,
      email,
      whatsap,
      latitude,
      longitude,
      city,
      uf,
    };

    return response.json({
      point,
      service,
    });
  }

  async index(request: Request, response: Response) {
    const { city, uf, service } = request.query;

    const pointsQuery = await knex("points")
      .join("services", "points.services_id", "=", "services.id")
      .where("services.id", Number(service))
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*", "services.type");

    if (!pointsQuery) {
      return response.status(400).json({ message: "Point not Found" });
    }

    return response.json(pointsQuery);
  }
}

export default PointsControler;
