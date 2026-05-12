import { Request, Response } from "express";
import * as locationService from "../services/locationService.js";

export const getAllLocations = async (req: Request, res: Response) => {
  try {
    const locations = await locationService.getAllLocations();
    res.json(locations);
  } catch (err) {
    console.error("Error fetching locations: ", (err as Error).message);
    res.status(500).json({
      error: "Failed to fetch locations",
      details: (err as Error).message,
    });
  }
};

export const getLocationById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const location = await locationService.getLocationById(id);

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.json(location);
  } catch (err) {
    console.error("Error fetching location: ", (err as Error).message);
    res.status(500).json({
      error: "Failed to fetch location.",
      details: (err as Error).message,
    });
  }
};

export const createLocation = async (req: Request, res: Response) => {
  try {
    const location = await locationService.createLocation(req.body);

    res.status(201).json(location);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create location" });
  }
};

export const patchLocation = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const updatedLocation = await locationService.patchLocation(id, req.body);

    if (!updatedLocation) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.json(updatedLocation);
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "Failed to patch location" });
  }
};

export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const deleted = await locationService.deleteLocation(id);

    if (!deleted) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "Failed to delete location." });
  }
};
