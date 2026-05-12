import * as classesModel from "../models/classesModel.js";
import { GymClass } from "../types/IGymClass.js";

export const getAllClasses = async () => {
  const classes = await classesModel.findAllClasses();

  return classes.map((c) => ({
    ...c,
    displayName: c.title,
  }));
};

export const getGymClassById = async (id: number) => {
  const gymClass = await classesModel.findGymClassById(id);

  if (!gymClass) {
    return null;
  }

  return {
    ...gymClass,
    displayName: gymClass.title,
  };
};

export const createClass = async (data: GymClass) => {
  return await classesModel.insertClass(data);
};

//funktioner för att göra starttime och endtime till starttid samt duration

//funktion för att ej kunna dubbelboka sig på två pass under samma tid
//funktion för att ej kunna dubbelboka två classes på samma lokal samma tid

export const updateClass = async (id: number, data: GymClass) => {
  return await classesModel.updateClass(id, data);
};

export const patchClass = async (id: number, data: Partial<GymClass>) => {
  return await classesModel.patchClass(id, data);
};

export const deleteClass = async (id: number) => {
  return await classesModel.deleteClass(id);
};
