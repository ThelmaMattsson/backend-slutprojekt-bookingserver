import * as locationModel from "../models/locationModel.js";
import { ILocation } from "../types/ILocation.js";

export const getAllLocations = async () => {
  const location = await locationModel.findAllLocations();

  return location.map((l) => ({
    ...l,
    displayName: l.title,
  }));
};

export const getLocationById = async (id: number) => {
  const location = await locationModel.findLocationById(id);

  if (!location) {
    return null;
  }

  return {
    ...location,
    displayName: location.title,
  };
};

export const createLocation = async (data: ILocation) => {
  return await locationModel.insertLocation(data);
};

export const patchLocation = async (id: number, data: Partial<ILocation>) => {
  return await locationModel.patchLocation(id, data);
};

export const deleteLocation = async (id: number) => {
  return await locationModel.deleteLocation(id);
};
