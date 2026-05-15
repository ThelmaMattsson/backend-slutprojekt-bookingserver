import { Request, Response } from "express";
import * as classesService from "../services/classesService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllClasses = asyncHandler(
  async (req: Request, res: Response) => {
    const classes = await classesService.getAllClasses();
    res.json(classes);
  },
);

//GET /api/classes/:id - en specifik klass
export const getGymClassById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const gymClass = await classesService.getGymClassById(id);

    if (!gymClass) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.json(gymClass);
  },
);

export const createClass = asyncHandler(async (req: Request, res: Response) => {
  const newClass = await classesService.createClass(req.body);

  res.status(201).json(newClass);
});

export const updateClass = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const updatedClass = await classesService.updateClass(id, req.body);

  if (!updatedClass) {
    return res.status(404).json({ error: "Class not found." });
  }

  res.json(updatedClass);
});

export const patchClass = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const updatedClass = await classesService.patchClass(id, req.body);

  if (!updatedClass) {
    return res.status(404).json({ error: "Class not found" });
  }

  res.json(updatedClass);
});

export const deleteClass = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const deleted = await classesService.deleteClass(id);

  if (!deleted) {
    return res.status(404).json({ error: "Class not found" });
  }

  res.status(204).send();
});

export const getClassBookingStats = asyncHandler(
  async (req: Request, res: Response) => {
    const stats = await classesService.getClassBookingStats();

    res.status(200).json(stats);
  },
);

export const getClassesDate = asyncHandler(
  async (req: Request, res: Response) => {
    const date = req.params.date as string;

    if (!date) {
      return res.status(400).json({
        error: "Date is required",
      });
    }

    const classes = await classesService.getClassesDate(date);
    console.log("DATE PARAM:", req.params.date);
    console.log("RESULT:", classes);
    res.status(200).json(classes);
  },
);

export const getClassesSchedule = asyncHandler(
  async (req: Request, res: Response) => {
    const classes = await classesService.getClassesSchedule();
    res.status(200).json(classes);
  },
);
