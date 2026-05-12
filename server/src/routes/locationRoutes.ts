import express from "express";
import * as locationController from "../controllers/locationController.js";

const locationRouter = express.Router();

locationRouter.get("/", locationController.getAllLocations);

locationRouter.get("/:id", locationController.getLocationById);

locationRouter.post("/", locationController.createLocation);

locationRouter.patch("/:id", locationController.patchLocation);

locationRouter.delete("/:id", locationController.deleteLocation);

export default locationRouter;
