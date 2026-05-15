import { Request, Response } from "express";
import * as locationService from "../services/locationService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllLocations = asyncHandler(
  async (req: Request, res: Response) => {
    const locations = await locationService.getAllLocations();
    res.json(locations);
  },
);

export const getLocationById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const location = await locationService.getLocationById(id);

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.json(location);
  },
);

export const createLocation = asyncHandler(
  async (req: Request, res: Response) => {
    const location = await locationService.createLocation(req.body);

    res.status(201).json(location);
  },
);

export const patchLocation = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const updatedLocation = await locationService.patchLocation(id, req.body);

    if (!updatedLocation) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.json(updatedLocation);
  },
);

export const deleteLocation = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const deleted = await locationService.deleteLocation(id);

    if (!deleted) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.status(204).send();
  },
);
