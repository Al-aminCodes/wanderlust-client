import { Schema, model, models } from "mongoose";

const DestinationSchema = new Schema(
  {
    destinationName: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    duration: { type: String, required: true, trim: true },
    departureDate: { type: Date, required: true },
    imageUrl: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

// `models.Destination` guards against the "OverwriteModelError" that happens
// when the dev server re-evaluates this module on a hot reload.
export const Destination =
  models.Destination ?? model("Destination", DestinationSchema);
