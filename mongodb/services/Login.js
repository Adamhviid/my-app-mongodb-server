import { User } from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

export default async function Login(email, password) {
  try {
    if (!(email && password)) {
      return "All input is required";
    }
    const user = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user != null && isPasswordValid === true) {
      const token = jwt.sign(
        {
          user_id: user.id,
          email: user.email,
          authorization: user.authorization
        },
        `${process.env.JWT_TOKEN_SECRET}`,
        {
          expiresIn: "24h",
        }
      );
      user.token = token;
      return user;
    } else {
      return "Email or password is incorrect"
    }
  } catch (err) {
    return err
  }
}