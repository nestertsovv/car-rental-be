import * as carsServices from "../services/carsServices.js";
import controllerWrapper from "../decorators/controllerWrapper.js";

const findCars = async (req, res) => {
  const {
    make,
    rentalPrice,
    mileageFrom,
    mileageTo,
    page = 1,
    perPage = 12,
  } = req.body;

  const skip = (page - 1) * perPage;

  const filter = {};

  if (make) {
    filter.make = make;
  }

  if (rentalPrice) {
    filter.rentalPrice = { $lte: rentalPrice };
  }

  if (mileageFrom || mileageTo) {
    filter.mileage = {};

    if (mileageFrom) filter.mileage.$gte = mileageFrom;
    if (mileageTo) filter.mileage.$lte = mileageTo;
  }

  const { cars, totalCount } = await carsServices.findCars(
    filter,
    skip,
    perPage
  );

  res.json({
    cars,
    totalPages: Math.ceil(totalCount / perPage),
    currentPage: page,
    totalItems: totalCount,
  });
};

export default {
  findCars: controllerWrapper(findCars),
};
