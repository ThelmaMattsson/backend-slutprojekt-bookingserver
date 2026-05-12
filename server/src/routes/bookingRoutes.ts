import express from "express";
import * as bookingController from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.get("/", bookingController.getAllBookings);

bookingRouter.get("/:id", bookingController.getBookingById);

bookingRouter.post("/", bookingController.createBooking);

bookingRouter.patch("/:id", bookingController.patchBooking);

bookingRouter.delete("/:id", bookingController.deleteBooking);

export default bookingRouter;
