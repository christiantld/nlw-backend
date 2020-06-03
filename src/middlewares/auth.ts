import { Request, Response, NextFunction, request } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "../config/auth";

interface TokenPayload {
  email: string;
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Token Validation
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("JWT token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const tokenDecoded = verify(token, authConfig.secret);

    // extract user ID and name from payload
    const { email, sub } = tokenDecoded as TokenPayload;

    request.user = {
      email,
      id: sub,
    };

    return next();
  } catch {
    throw new Error("Invalid JWT token");
  }
}
