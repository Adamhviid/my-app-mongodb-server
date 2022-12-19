import express from "express";
import { Artist } from "../models/artist.js";

const router = express.Router();

router.get("/search/artist/:artist", async (req, res) => {
  const { artist } = req.params;

  await Artist.findOne({
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
  });
});

export default router;