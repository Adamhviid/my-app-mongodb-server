import express from "express";
import { User } from "../../models/user.js";
import * as dotenv from 'dotenv'
dotenv.config()
import verifyToken from "../../middleware/verifyToken.js";

const router = express.Router();

router.post("/user", verifyToken, async (req, res) => {
  const user = res.user;
  try {
    const findUser = await User.findOne(user);
    if (!findUser) {
      return res.json({ message: 'No user found' })
    }
    return res.status(200).json(findUser);
  } catch (error) {
    return res.json({ error: error });
  }
});

export default router;