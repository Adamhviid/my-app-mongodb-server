import express from "express";
import { User } from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("Email and password is required");
      return;
    }

    const user = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) {
      const token = jwt.sign(
        {
          user_id: user.id,
          email: email,
          authorization: user.authorization
        },
        `${process.env.JWT_TOKEN_SECRET}`,
        {
          expiresIn: "24h",
        }
      );
      user.token = token;
      res.status(200).json(user);
    } else {
      res.status(400).send("Email or password is incorrect");
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
