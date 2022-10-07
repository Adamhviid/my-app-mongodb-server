import express, { request } from "express";
import axios from "axios";
import { Artist } from "../models/artist.js";

const router = express.Router();


router.get("/search/artist/:artist", async (req, res, next) => {

  const artist = await Artist.findOne({
    strArtist: new RegExp("^" + req.params.artist.toLowerCase(), "i"),
  });

  if (!artist) {
    /*   res.status(404).send("Artist not found"); */
    const { data } = await axios.get(
      "http://localhost:3001/api/search/artist/" + req.params.artist
    );

    let artist = new Artist(data)
    artist = await artist.save();
    setTimeout(() => { res.json(artist); }, 5000);
  } else {
    res.json(artist);
  }

  /* if (req.params.id != 1) {
    
  } */
});

//export this router to use in our index.js
export default router;