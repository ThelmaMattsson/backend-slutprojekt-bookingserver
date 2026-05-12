import { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import { IUser } from "../types/IUser.js";

export const findAllUsers = async () => {
  const [rows] = await pool.execute<IUser[]>(
    "SELECT user_id, fnamn, enamn, created_at FROM users",
  );
  return rows;
};

export const findUserById = async (id: number): Promise<IUser | undefined> => {
  const [rows] = await pool.execute<IUser[]>(
    "SELECT user_id, fnamn, enamn, created_at FROM users WHERE user_id = ?",
    [id],
  );
  return rows[0];
};

export const insertUser = async (data: IUser) => {
  const { fnamn, enamn } = data;

  const [result] = await pool.execute<ResultSetHeader>(
    `
        INSERT INTO users (fnamn, enamn) VALUES (?, ?)`,
    [fnamn, enamn],
  );

  return { id: result.insertId, fnamn, enamn };
};

export const patchUser = async (id: number, data: Partial<IUser>) => {
  const fields = Object.keys(data);

  if (fields.length === 0) {
    return null;
  }

  const values = Object.values(data);

  const sql = `
    UPDATE users SET ${fields.map((field) => `${field} = ?`).join(", ")} WHERE user_id = ?
    `;

  await pool.execute(sql, [...values, id]);

  return { id, ...data };
};

export const deleteUser = async (id: number) => {
  const [result] = await pool.execute<ResultSetHeader>(
    `
        DELETE FROM users WHERE user_id = ?
        `,
    [id],
  );

  return result.affectedRows > 0;
};
