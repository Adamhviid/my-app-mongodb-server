import express from "express";
import axios from "axios";
import neo4j from "neo4j-driver";
import * as dotenv from 'dotenv'
dotenv.config()

import { Album } from "../models/album.js";

const router = express.Router();

router.get("/search/albums/:artist", async (req, res) => {
  const { artist } = req.params;

  await Album.find({
    strArtist: new RegExp("^" + artist.toLowerCase(), "i")
  }).then(async (result) => {
    if (result === null || result.length === 0) {
      const { data } = await axios.get(
        "http://localhost:3001/api/search/albums/" + artist
      );
      let albums = data.album.map((album) => new Album(album));
      await Album.insertMany(albums);
      await Album.find({
        strArtist: new RegExp("^" + artist.toLowerCase(), "i")
      }).then(async (result) => {
        setTimeout(async () => {
          res.json(result);
        }, 1000);
      });
    } else {
      setTimeout(async () => {
        res.json(result);
      }, 1000)
    }
  });
});



export default router;