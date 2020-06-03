import express from "express";

import PointsController from "./controllers/PointsController";
import ServicesController from "./controllers/ServicesController";
import SessionController from "./controllers/SessionController";

const routes = express.Router();
const pointsController = new PointsController();
const servicesController = new ServicesController();
const sessionController = new SessionController();

// Sign Up
routes.post("/points", pointsController.store);

// Sign In
routes.post("/session", sessionController.store);

routes.get("/services", servicesController.index);
routes.get("/points/:id", pointsController.show);
routes.get("/points", pointsController.index);

export default routes;
