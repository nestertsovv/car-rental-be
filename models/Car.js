import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateOptions } from "./hooks.js";

const carSchema = new Schema({
  make: {
    type: String,
  },
  rentalPrice: {
    type: Number,
  },
  mileage: {
    type: Number,
  },
});

carSchema.pre("findOneAndUpdate", setUpdateOptions);
carSchema.post("findOneAndUpdate", handleSaveError);

const Car = model("car", carSchema);

export default Car;
