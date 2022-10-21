import express from "express";
import axios from "axios";
import { Album } from "../models/album.js";

const router = express.Router();

router.get("/search/albums/:artist", async (req, res) => {
  const albums = await Album.findOne({
    strArtist: new RegExp("^" + req.params.artist.toLowerCase(), "i")
  });

  if (!albums) {
    const { data } = await axios.get(
      "http://localhost:3001/api/search/albums/" + req.params.artist
    );
    let albums = data.album.map((album) => new Album(album));
    albums = await Album.insertMany(albums);
    setTimeout(() => { res.json(albums); }, 5000);
  } else {
    const albums = await Album.find({
      strArtist: new RegExp("^" + req.params.artist.toLowerCase(), "i")
    });
    setTimeout(() => { res.json(albums); }, 5000);
  }
});

export default router;