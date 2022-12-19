import express from "express";
import Register from "../../services/Register.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  Register(email, password)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(409).send(err);
    });
});

export default router;