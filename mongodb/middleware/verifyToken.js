import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

export default async function (req, res, next) {
  const token = req.header('JWT_TOKEN');
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    res.user = verifiedToken;
    next();
  }
  catch (error) {
    res.status(400).send('Invalid token !');
  }
}