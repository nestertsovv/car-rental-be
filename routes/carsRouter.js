import { Router } from "express";
import carsControllers from "../controllers/carsControllers.js";

const carsRouter = Router();

carsRouter.get("/", carsControllers.findCars);

export default carsRouter;
