import express from "express";
import * as classesService from "../services/classesService.js";
import { pool } from "../config/db.js";
import * as classesController from "../controllers/classesController.js";

const classesRouter = express.Router();

classesRouter.get("/", classesController.getAllClasses);

classesRouter.get("/:id", classesController.getGymClassById);

classesRouter.post("/", classesController.createClass);

classesRouter.put("/:id", classesController.updateClass);

classesRouter.patch("/:id", classesController.patchClass);

classesRouter.delete("/:id", classesController.deleteClass);

export default classesRouter;
