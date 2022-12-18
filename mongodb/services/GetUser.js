import { User } from "../models/user.js";

export default async function GetUser(user) {
  try {
    const findUser = await User.findOne(user);
    if (!findUser) {
      return res.json({ message: 'No user found' })
    }
    return findUser;
  } catch (error) {
    return error;
  }
}