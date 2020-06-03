import knex from "../database/connection";
//import * as Yup from "yup";
import { Request, Response } from "express";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../config/auth";

class SessionController {
  async store(request: Request, response: Response) {
    const { email, password } = request.body;

    const point = await knex("points")
      .where("email", email)
      .select("id", "name")
      .first();

    const getPassword = await knex("points")
      .where("email", email)
      .select("password_hash")
      .first();

    const password_hash = String(Object.values(getPassword));

    if (!point) {
      response.status(404).json({ error: "User not found" });
    }

    function checkPassword(password: string) {
      return compare(password, password_hash);
    }

    if (!(await checkPassword(password))) {
      return response.status(401).json({
        error: "Invalid Authentication",
      });
    }

    return response.json({
      point,
      token: jwt.sign({ email }, auth.secret, {
        subject: String(point.id),
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default SessionController;
