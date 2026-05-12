import express from "express";
import * as usersController from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.get("/", usersController.getAllUsers);

usersRouter.get("/:id", usersController.getUserById);

usersRouter.post("/", usersController.createUser);

usersRouter.patch("/:id", usersController.patchUser);

usersRouter.delete("/:id", usersController.deleteUser);

export default usersRouter;
