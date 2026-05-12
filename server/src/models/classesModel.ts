import { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import { GymClass } from "../types/IGymClass.js";

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
