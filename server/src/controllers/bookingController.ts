import { Request, Response } from "express";
import * as bookingService from "../services/bookingService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllBookings = asyncHandler(
  async (req: Request, res: Response) => {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  },
);

export const getBookingById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const booking = await bookingService.getBookingById(id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  },
);

export const createBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const newBooking = await bookingService.createBooking(req.body);
    res.status(201).json(newBooking);
  },
);

export const patchBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const updatedBooking = await bookingService.patchBooking(id, req.body);

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(updatedBooking);
  },
);

export const deleteBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const deleted = await bookingService.deleteBooking(id);

    if (!deleted) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(204).send();
  },
);
