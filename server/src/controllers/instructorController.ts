import { Request, Response } from "express";
import * as instructorService from "../services/instructorService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//hämta alla instructors ist för try catch med console.error och res.status(500) används middleware errorhandler och asynchandler
export const getAllInstructors = asyncHandler(
  async (req: Request, res: Response) => {
    const instructors = await instructorService.getAllInstructors();
    res.json(instructors);
  },
);

//hämta instructors med id
export const getInstructorById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const instructor = await instructorService.getInstructorById(id);

    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }
    res.json(instructor);
  },
);

//create instructor
export const createInstructor = asyncHandler(
  async (req: Request, res: Response) => {
    const newInstructor = await instructorService.createInstructor(req.body);

    res.status(201).json(newInstructor);
  },
);

//patch
export const patchInstructor = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const updatedInstructor = await instructorService.patchInstructor(
      id,
      req.body,
    );

    if (!updatedInstructor) {
      return res.status(404).json({ error: "Instructor not found." });
    }

    res.json(updatedInstructor);
  },
);

//delete instructor
export const deleteInstructor = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const deleted = await instructorService.deleteInstructor(id);

    if (!deleted) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    res.status(204).send();
  },
);
