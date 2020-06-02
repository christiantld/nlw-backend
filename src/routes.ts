import express from "express";

const routes = express.Router();

//List All Users
routes.get("/", (request, response) => {
  response.json({ message: "Application Running on port 3333" });
});

export default routes;
