import express from "express";
import { User } from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("Email is already in use");
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

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

export default router;