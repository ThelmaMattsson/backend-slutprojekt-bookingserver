import { Request, Response } from "express";
import * as instructorService from "../services/instructorService.js";

//hämta alla instructors
export const getAllInstructors = async (req: Request, res: Response) => {
  try {
    const instructors = await instructorService.getAllInstructors();
    res.json(instructors);
  } catch (err) {
    console.error("Error fetching instructors: ", (err as Error).message);
    res.status(500).json({
      error: "Failed to fetch instructors",
      details: (err as Error).message,
    });
  }
};

//hämta instructors med id
export const getInstructorById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const instructor = await instructorService.getInstructorById(id);

    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }
    res.json(instructor);
  } catch (err) {
    console.error("Error fetching instructor: ", (err as Error).message);
    res.status(500).json({
      error: "Failed to fetch instructor.",
      details: (err as Error).message,
    });
  }
};

//create instructor
export const createInstructor = async (req: Request, res: Response) => {
  try {
    const newInstructor = await instructorService.createInstructor(req.body);

    res.status(201).json(newInstructor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create instructor" });
  }
};

//patch
export const patchInstructor = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "Failed to patch instructor" });
  }
};

//delete instructor
export const deleteInstructor = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const deleted = await instructorService.deleteInstructor(id);

    if (!deleted) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "Failed to delete instructor." });
  }
};
