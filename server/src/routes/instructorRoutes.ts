import express from "express";
import * as instructorController from "../controllers/instructorController.js";

const instructorRouter = express.Router();

instructorRouter.get("/", instructorController.getAllInstructors);

instructorRouter.get("/:id", instructorController.getInstructorById);

instructorRouter.post("/", instructorController.createInstructor);

instructorRouter.patch("/:id", instructorController.patchInstructor);

instructorRouter.delete("/:id", instructorController.deleteInstructor);

export default instructorRouter;
