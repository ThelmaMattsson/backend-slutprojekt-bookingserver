import { RowDataPacket } from "mysql2";

export interface IBooking extends RowDataPacket {
  booking_id: number;
  user_id: number;
  class_id: number;
}
