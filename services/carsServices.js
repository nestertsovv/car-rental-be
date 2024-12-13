import Car from "../models/Car.js";

export const findCars = async (filter, skip, perPage) => {
  const cars = await Car.find(filter).skip(skip).limit(perPage);
  const totalCount = await Car.countDocuments(filter);

  return { cars, totalCount };
};
