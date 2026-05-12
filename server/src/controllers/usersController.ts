import { Request, Response } from "express";
import * as usersService from "../services/usersService.js";

//GET api/users alla users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users: ", err);
    res.status(500).json({
      error: "Failed to fetch users",
      details: (err as Error).message,
    });
  }
};

//GET /api/users/:id - en specifik user
export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const user = await usersService.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to fetch user",
      details: (err as Error).message,
    });
  }
};

//POST /api/users - skapa user
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await usersService.createUser(req.body);

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
};

//update user
export const patchUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const updatedUser = await usersService.patchUser(id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to patch user",
    });
  }
};

//delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const deleted = await usersService.deleteUser(id);

    if (!deleteUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete class" });
  }
};
