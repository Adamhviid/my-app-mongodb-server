import express from "express";
import { User } from "../../models/user.js";
import * as dotenv from 'dotenv'
dotenv.config()
import auth from "../../middleware/auth.js";

const router = express.Router();

router.get("/user", auth, async (req, res) => {
  console.log("veryfing token");
  try {
    const user = await User.find();
    if (!user) {
      return res.json({ message: 'No user found' })
    }
    return res.json({ user: user })
  } catch (error) {
    return res.json({ error: error });
  }
});

export default router;