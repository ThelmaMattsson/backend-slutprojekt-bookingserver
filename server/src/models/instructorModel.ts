import { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import { IInstructor } from "../types/IInstructor.js";

export const findAllInstructors = async (): Promise<IInstructor[]> => {
  const [rows] = await pool.execute<IInstructor[]>(
    "SELECT instructor_id, fnamn, enamn FROM instructor",
  );

  return rows;
};

export const findInstructorById = async (
  id: number,
): Promise<IInstructor | undefined> => {
  const [rows] = await pool.execute<IInstructor[]>(
    "SELECT instructor_id, fnamn, enamn FROM instructor WHERE instructor_id = ?",
    [id],
  );

  return rows[0];
};

export const insertInstructor = async (data: IInstructor) => {
  const { fnamn, enamn } = data;

  const [result] = await pool.execute<ResultSetHeader>(
    "INSERT INTO instructor (fnamn, enamn) VALUES (?, ?)",
    [fnamn, enamn],
  );
  return { id: result.insertId, fnamn, enamn };
};

export const patchInstructor = async (
  id: number,
  data: Partial<IInstructor>,
) => {
  const fields = Object.keys(data);

  if (fields.length === 0) {
    return null;
  }

  const values = Object.values(data);

  const sql = `
    UPDATE instructor SET ${fields.map((field) => `${field} = ?`).join(", ")} WHERE instructor_id = ?
    `;

  await pool.execute(sql, [...values, id]);

  return { id, ...data };
};

export const deleteInstructor = async (id: number) => {
  const [result] = await pool.execute<ResultSetHeader>(
    `
        DELETE FROM instructor WHERE instructor_id = ?
        `,
    [id],
  );
  return result.affectedRows > 0;
};
