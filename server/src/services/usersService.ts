import * as usersModel from "../models/usersModel.js";
import { IUser } from "../types/IUser.js";

export const getAllUsers = async () => {
  const users = await usersModel.findAllUsers();

  return users.map((u) => ({
    ...u,
    displayName: `${u.fnamn} ${u.enamn}`,
  }));
};

export const getUserById = async (id: number) => {
  const user = await usersModel.findUserById(id);

  if (!user) {
    return null;
  }

  return {
    ...user,
    displayName: `${user.fnamn} ${user.enamn}`,
  };
};

export const createUser = async (data: IUser) => {
  return await usersModel.insertUser(data);
};

export const patchUser = async (id: number, data: Partial<IUser>) => {
  return await usersModel.patchUser(id, data);
};

export const deleteUser = async (id: number) => {
  return await usersModel.deleteUser(id);
};

export const usersCount = async () => {
  const rows = await usersModel.usersCount();

  return rows;
};
