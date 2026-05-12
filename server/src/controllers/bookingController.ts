import { Request, Response } from "express";
import * as bookingService from "../services/bookingService.js";

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings: ", err);
    res.status(500).json({
      error: "Failed to fetch bookings",
      details: err,
    });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const booking = await bookingService.getBookingById(id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    console.error("Error fetching booking: ", err);

    res.status(500).json({
      error: "Failed to fetch booking",
      details: err,
    });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const newBooking = await bookingService.createBooking(req.body);
    res.status(201).json(newBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to create booking",
    });
  }
};

export const patchBooking = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const updatedBooking = await bookingService.patchBooking(id, req.body);

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(updatedBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to patch booking" });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const deleted = await bookingService.deleteBooking(id);

    if (!deleted) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete booking" });
  }
};
