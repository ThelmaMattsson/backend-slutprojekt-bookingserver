import { Request, Response } from "express";
import * as usersService from "../services/usersService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//GET api/users alla users
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await usersService.getAllUsers();
  res.json(users);
});

//GET /api/users/:id - en specifik user
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const user = await usersService.getUserById(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

//POST /api/users - skapa user
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const newUser = await usersService.createUser(req.body);

  res.status(201).json(newUser);
});

//update user
export const patchUser = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const updatedUser = await usersService.patchUser(id, req.body);

  if (!updatedUser) {
    return res.status(404).json({ error: "User not found." });
  }
  res.json(updatedUser);
});

//delete user
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const deleted = await usersService.deleteUser(id);

  if (!deleteUser) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(204).send();
});

export const usersCount = asyncHandler(async (req: Request, res: Response) => {
  const rows = await usersService.usersCount();
  res.status(200).json(rows);
});
