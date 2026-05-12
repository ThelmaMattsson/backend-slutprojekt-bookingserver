import * as instructorModel from "../models/instructorModel.js";
import { IInstructor } from "../types/IInstructor.js";

export const getAllInstructors = async () => {
  const instructors = await instructorModel.findAllInstructors();

  return instructors.map((instructor) => ({
    ...instructor,
    displayName: `${instructor.fnamn} ${instructor.enamn}`,
  }));
};

export const getInstructorById = async (id: number) => {
  const instructor = await instructorModel.findInstructorById(id);

  if (!instructor) {
    return null;
  }

  return {
    ...instructor,
    displayName: `${instructor.fnamn} ${instructor.enamn}`,
  };
};

export const createInstructor = async (data: IInstructor) => {
  return await instructorModel.insertInstructor(data);
};

export const patchInstructor = async (
  id: number,
  data: Partial<IInstructor>,
) => {
  return await instructorModel.patchInstructor(id, data);
};

export const deleteInstructor = async (id: number) => {
  return await instructorModel.deleteInstructor(id);
};
