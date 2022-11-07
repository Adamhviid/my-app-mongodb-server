import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  token: { type: String },
});

const User = mongoose.model("User", userSchema);

export { User }