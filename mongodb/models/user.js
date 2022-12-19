import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  authorization: { type: Number },
  token: { type: String },
});

const User = mongoose.model("User", userSchema);

export { User }