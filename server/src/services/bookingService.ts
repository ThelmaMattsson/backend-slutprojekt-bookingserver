import * as bookingModel from "../models/bookingModel.js";
import { IBooking } from "../types/IBooking.js";

export const getAllBookings = async () => {
  const bookings = await bookingModel.findAllBookings();

  return bookings.map((b) => ({
    ...b,
  }));
};

export const getBookingById = async (id: number) => {
  const booking = await bookingModel.findBookingById(id);

  if (!booking) {
    return null;
  }

  return {
    ...booking,
  };
};

export const createBooking = async (data: IBooking) => {
  return await bookingModel.insertBooking(data);
};

export const patchBooking = async (id: number, data: Partial<IBooking>) => {
  return await bookingModel.patchBooking(id, data);
};

export const deleteBooking = async (id: number) => {
  return await bookingModel.deleteBooking(id);
};
