import express from "express";

import PointsController from "./controllers/PointsController";
import ServicesController from "./controllers/ServicesController";

const routes = express.Router();
const pointsController = new PointsController();
const servicesController = new ServicesController();

routes.get("/services", servicesController.index);
routes.post("/points", pointsController.store);
routes.get("/points/:id", pointsController.show);

export default routes;
