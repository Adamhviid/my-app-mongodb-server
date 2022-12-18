import express from "express";
import axios from "axios";
import neo4j from "neo4j-driver";
import * as dotenv from 'dotenv'
dotenv.config()

import createAlbumOwner from "../neo4j/CRUD/artist/createAlbumOwner.js";
import getAlbumsByArtist from "../neo4j/CRUD/artist/getAlbumsByArtist.js";

const router = express.Router();
const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD));

router.get("/search/albums/:artist", async (req, res) => {
  const { artist } = req.params;

  await getAlbumsByArtist(driver, artist)
    .then(async (result) => {
      if (result === null || result.length === 0) {
        console.log("No albums found in Neo4j");
        const { data } = await axios.get(
          `${process.env.PORT}` + "/api/search/albums/" + artist
        );
        for (let i = 0; i < data.album.length; i++) {
          await createAlbumOwner(driver, artist, data.album[i]);
        }
        const neo4jAlbums = await getAlbumsByArtist(driver, artist);
        setTimeout(async () => {
          res.json(neo4jAlbums);
        }, 1000);
      } else {
        console.log("Albums found in Neo4j");
        res.json(result);
      }
    });
});


export default router;