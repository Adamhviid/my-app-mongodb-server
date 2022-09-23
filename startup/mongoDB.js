import mongoose from "mongoose";
import config from "config";

export default async function () {
  mongoose
    .connect(config.get("db"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB..."));

  mongoose.set("debug", true);
}