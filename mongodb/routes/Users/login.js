import express from "express";
import Login from '../../services/Login.js'

const router = express.Router();

router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).send("Email and password is required");
    return;
  }

  Login(email, password)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });

});

export default router;
