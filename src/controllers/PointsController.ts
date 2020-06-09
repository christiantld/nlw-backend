import { Request, Response } from "express";
import knex from "../database/connection";

//TODO criar um repository e um Service para esse controller
class PointsControler {
  async store(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      site,
      latitude,
      longitude,
      city,
      uf,
      services_id,
    } = request.body;

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      site,
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
      site,
      latitude,
      longitude,
      city,
      uf,
      services_id,
    } = pointQuery;

    const point = {
      id: Number(id),
      image: `http://192.168.0.14:3333/temp/${image}`,
      name,
      email,
      whatsap,
      site,
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

    const serializedPoints = pointsQuery.map((point) => {
      return {
        ...point,
        image: `http://192.168.0.14:3333/temp/${point.image}`,
      };
    });

    return response.json(serializedPoints);
  }
}

export default PointsControler;
