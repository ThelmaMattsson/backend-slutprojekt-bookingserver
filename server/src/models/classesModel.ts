import { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import { GymClass, IClassSchedule, IDate } from "../types/IGymClass.js";

export const findAllClasses = async (): Promise<GymClass[]> => {
  const [rows] = await pool.execute<GymClass[]>(
    "SELECT class_id, title, start_time, end_time, difficulty, max_participants, instructor_id, location_id FROM classes",
  );

  return rows;
};

export const findGymClassById = async (
  id: number,
): Promise<GymClass | undefined> => {
  const [rows] = await pool.execute<GymClass[]>(
    "SELECT class_id, title, start_time, end_time, difficulty, max_participants, instructor_id, location_id FROM classes WHERE class_id = ?",
    [id],
  );

  return rows[0];
};

export const insertClass = async (data: GymClass) => {
  const {
    title,
    start_time,
    end_time,
    difficulty,
    max_participants,
    instructor_id,
    location_id,
  } = data;

  const [result] = await pool.execute<ResultSetHeader>(
    "INSERT INTO classes (title, start_time, end_time, difficulty, max_participants, instructor_id, location_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      title,
      start_time,
      end_time,
      difficulty,
      max_participants,
      instructor_id,
      location_id,
    ],
  );
  return {
    id: result.insertId,
    title,
    start_time,
    end_time,
    difficulty,
    max_participants,
    instructor_id,
    location_id,
  };
};

export const updateClass = async (id: number, data: GymClass) => {
  const {
    title,
    start_time,
    end_time,
    difficulty,
    max_participants,
    instructor_id,
    location_id,
  } = data;

  await pool.execute(
    `
    UPDATE classes SET title = ?, start_time = ?, end_time = ?, difficulty = ?, max_participants = ?, instructor_id = ?, location_id = ? WHERE class_id = ?
    `,
    [
      title,
      start_time,
      end_time,
      difficulty,
      max_participants,
      instructor_id,
      location_id,
      id,
    ],
  );

  return {
    id,
    ...data,
  };
};

export const patchClass = async (id: number, data: Partial<GymClass>) => {
  const fields = Object.keys(data);

  if (fields.length === 0) {
    return null;
  }

  const values = Object.values(data);

  const sql = `
  UPDATE classes SET ${fields.map((field) => `${field} = ?`).join(", ")} WHERE class_id = ?
  `;

  await pool.execute(sql, [...values, id]);

  return {
    id,
    ...data,
  };
};

export const deleteClass = async (id: number) => {
  const [result] = await pool.execute<ResultSetHeader>(
    `
    DELETE FROM classes WHERE class_id = ?
    `,
    [id],
  );

  return result.affectedRows > 0;
};

export const getClassBookingStats = async () => {
  const [rows] = await pool.execute(
    `
    SELECT classes.class_id, classes.title, COUNT(booking.booking_id) AS total_bookings, classes.max_participants FROM classes LEFT JOIN booking ON classes.class_id = booking.class_id GROUP BY classes.class_id
    `,
  );

  return rows;
};

export const findClassesDate = async (date: string) => {
  const [rows] = await pool.execute(
    `
    SELECT * FROM classes WHERE DATE(start_time) = ? ORDER BY start_time ASC
    `,
    [date],
  );
  return rows;
};

export const findClassesSchedule = async (): Promise<IClassSchedule[]> => {
  const [rows] = await pool.execute<IClassSchedule[]>(
    `
    SELECT c.class_id, c.title, c.start_time, c.end_time, l.name AS location, i.fnamn, c.max_participants, COUNT(b.booking_id) AS booked FROM classes c JOIN location l ON c.location_id = l.location_id JOIN instructor i ON c.instructor_id = i.instructor_id LEFT JOIN booking b ON c.class_id = b.class_id GROUP BY c.class_id, title, c.start_time, c.end_time, l.name, i.fnamn, c.max_participants ORDER BY c.start_time ASC;
    `,
  );
  return rows;
};
