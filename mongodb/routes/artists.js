import express from "express";
import axios from "axios";
import { Artist } from "../models/artist.js";
import Artists from "../services/Artists.js";

const router = express.Router();

router.get("/search/artist/:artist", async (req, res) => {
  const { artist } = req.params;

  Artists(artist)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send("err");
    });

  /* await Artist.findOne({
    strArtist: new RegExp("^" + artist.toLowerCase(), "i")
  }).then(async (result) => {
    if (result === null || result.length === 0) {
      const { data } = await axios.get(
        `${process.env.PORT}` + "/api/search/artist/" + artist
      );
      const newArtist = new Artist(data)
      await newArtist.save();
    } else {
      res.json(result);
    }
  }); */
});

export default router;