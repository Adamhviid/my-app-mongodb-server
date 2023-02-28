import express from "express";
import Albums from "../services/Albums.js";

const router = express.Router();

router.get("/search/albums/:artist", async (req, res) => {
  const { artist } = req.params;

  Albums(artist)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send("err");
    });
});

export default router;