import { User } from "../models/user.js";
import bcrypt from "bcrypt";

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
      authorization: 2,
    })
    return user;
  } catch (error) {
    return error;
  }
}

