import 'dotenv';
import jwt from "jsonwebtoken";

export default async function (req, res, next) {

  const token = req.header('JWT_TOKEN');

  if (!token) return res.status(401).send('Access Denied !');
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    res.user = verifiedToken;

    next();
  }
  catch (error) {
    res.status(400).send('Invalid token !');
  }
}