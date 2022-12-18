import express from "express";
/* import Artist from "../services/Artists.js"; */
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
      let newArtist = new Artist(data)
      await newArtist.save();
    } else {
      res.json(result);
    }
  });

  /* Artist(artist)
    .then((result) => {
      res.send(200).json(result)
    })
    .catch((err) => {
      res.status(400).send(err);
    }); */
});

export default router;