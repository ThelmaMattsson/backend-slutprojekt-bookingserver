import { Request, Response } from "express";
import * as classesService from "../services/classesService.js";

export const getAllClasses = async (req: Request, res: Response) => {
  try {
    const classes = await classesService.getAllClasses();
    res.json(classes);
  } catch (err) {
    console.error("Error fetching classes: ", (err as Error).message);
    res.status(500).json({
      error: "Failed to fetch classes",
      details: (err as Error).message,
    });
  }
};

//GET /api/classes/:id - en specifik klass
export const getGymClassById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const gymClass = await classesService.getGymClassById(id);

    if (!gymClass) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.json(gymClass);
  } catch (err) {
    console.error("Error fetching class: ", (err as Error).message);
    res.status(500).json({
      error: "Failed to fetch class.",
      details: (err as Error).message,
    });
  }
};

export const createClass = async (req: Request, res: Response) => {
  //validera datum ?? ej dåtid, ej tusen år i framtiden
  try {
    const newClass = await classesService.createClass(req.body);

    res.status(201).json(newClass);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create class" });
  }
};

export const updateClass = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const updatedClass = await classesService.updateClass(id, req.body);

    if (!updatedClass) {
      return res.status(404).json({ error: "Class not found." });
    }

    res.json(updatedClass);
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "Failed to update class" });
  }
};

export const patchClass = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const updatedClass = await classesService.patchClass(id, req.body);

    if (!updatedClass) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.json(updatedClass);
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "Failed to patch class" });
  }
};

export const deleteClass = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const deleted = await classesService.deleteClass(id);

    if (!deleted) {
      return res.status(404).json({ error: "Class not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "Failed to delete class." });
  }
};
