import * as classesModel from "../models/classesModel.js";
import { GymClass, IDate } from "../types/IGymClass.js";

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

export const getClassBookingStats = async () => {
  return await classesModel.getClassBookingStats();
};

export const getClassesDate = async (date: string) => {
  return await classesModel.findClassesDate(date);
};

export const getClassesSchedule = async () => {
  const classes = await classesModel.findClassesSchedule();

  return classes.map((gymClass) => {
    const start = new Date(gymClass.start_time);
    const end = new Date(gymClass.end_time);
    const duration = (end.getTime() - start.getTime()) / 1000 / 60;

    return {
      class_id: gymClass.class_id,
      title: gymClass.title,
      start_time: gymClass.start_time,
      duration: duration,
      instructor: gymClass.fnamn,
      location: gymClass.location,
      max_participants: gymClass.max_participants,
      booked: gymClass.booked,
    };
  });
};
