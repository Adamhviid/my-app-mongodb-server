import express from "express";
import verifyToken from "../../middleware/verifyToken.js";
import GetUser from "../../services/GetUser.js";

const router = express.Router();

router.post("/user", verifyToken, async (req, res) => {
  const user = res.user;

  GetUser(user)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

export default router;