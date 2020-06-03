import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import knex from "../database/connection";

//TODO criar um repository e um Service para esse controller
class PointsControler {
  async store(request: Request, response: Response) {
    const {
      name,
      email,
      password,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      services_id,
    } = request.body;

    const password_hash = await bcrypt.hash(password, 8);

    const insertedID = await knex("points").insert({
      image: "image-fake",
      name,
      email,
      password_hash,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      services_id,
    });

    const point = {
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      services_id,
    };

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
}

export default PointsControler;
