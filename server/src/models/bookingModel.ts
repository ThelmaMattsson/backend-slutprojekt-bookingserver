import { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import { IBooking } from "../types/IBooking.js";

export const findAllBookings = async (): Promise<IBooking[]> => {
  const [rows] = await pool.execute<IBooking[]>(
    "SELECT booking_id, user_id, class_id FROM booking",
  );

  return rows;
};

export const findBookingById = async (
  id: number,
): Promise<IBooking | undefined> => {
  const [rows] = await pool.execute<IBooking[]>(
    "SELECT booking_id, user_id, class_id FROM booking WHERE booking_id = ?",
    [id],
  );

  return rows[0];
};

export const insertBooking = async (data: IBooking) => {
  const { user_id, class_id } = data;

  const [result] = await pool.execute<ResultSetHeader>(
    "INSERT INTO booking (user_id, class_id) VALUES (?, ?)",
    [user_id, class_id],
  );
  return { id: result.insertId, user_id, class_id };
};

export const patchBooking = async (id: number, data: Partial<IBooking>) => {
  const fields = Object.keys(data);

  if (fields.length === 0) {
    return null;
  }

  const values = Object.values(data);

  const sql = `
    UPDATE booking SET ${fields.map((field) => `${field} = ?`).join(", ")} WHERE booking_id = ?`;

  await pool.execute(sql, [...values, id]);

  return { id, ...data };
};

export const deleteBooking = async (id: number) => {
  const [result] = await pool.execute<ResultSetHeader>(
    `
        DELETE FROM booking WHERE booking_id = ?
        `,
    [id],
  );
  return result.affectedRows > 0;
};
