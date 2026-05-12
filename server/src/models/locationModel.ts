import { ResultSetHeader } from "mysql2";
import { pool } from "../config/db.js";
import { ILocation } from "../types/ILocation.js";

export const findAllLocations = async (): Promise<ILocation[]> => {
  const [rows] = await pool.execute<ILocation[]>(
    "SELECT location_id, name, address, capacity FROM location",
  );

  return rows;
};

export const findLocationById = async (
  id: number,
): Promise<ILocation | undefined> => {
  const [rows] = await pool.execute<ILocation[]>(
    "SELECT location_id, name, address, capacity FROM location WHERE location_id = ?",
    [id],
  );

  return rows[0];
};

export const insertLocation = async (data: ILocation) => {
  const { name, address, capacity } = data;

  const [result] = await pool.execute<ResultSetHeader>(
    "INSERT INTO location (name, address, capacity) VALUES (?, ?, ?)",
    [name, address, capacity],
  );
  return {
    id: result.insertId,
    name,
    address,
    capacity,
  };
};

export const patchLocation = async (id: number, data: Partial<ILocation>) => {
  const fields = Object.keys(data);

  if (fields.length === 0) {
    return null;
  }

  const values = Object.values(data);

  const sql = `
  UPDATE location SET ${fields.map((field) => `${field} = ?`).join(", ")} WHERE location_id = ?
  `;

  await pool.execute(sql, [...values, id]);

  return {
    id,
    ...data,
  };
};

export const deleteLocation = async (id: number) => {
  const [result] = await pool.execute<ResultSetHeader>(
    `
    DELETE FROM location WHERE location_id = ?
    `,
    [id],
  );

  return result.affectedRows > 0;
};
