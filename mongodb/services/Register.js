import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

export default async function Register(email, password) {
  try {

    if (!(email && password)) {
      return "All input is required";
    }
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return "Email is already in use";
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email: email,
      password: encryptedPassword,
    })

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );
    user.token = token;
    return user;
  } catch (error) {
    return error;
  }
}