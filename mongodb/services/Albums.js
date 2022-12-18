import axios from "axios";
import * as dotenv from 'dotenv'
dotenv.config()

import { Album } from "../models/album.js";

export default async function Albums(artist) {
  try {
    await Album.find({
      strArtist: new RegExp("^" + artist.toLowerCase(), "i")
    })
      .then(async (result) => {
        if (result === null || result.length === 0) {
          const { data } = await axios.get(
            "http://localhost:3001/api/search/albums/" + artist
          );
          let albums = data.album.map((album) => new Album(album));

          await Album.insertMany(albums);
          await Album.find({
            strArtist: new RegExp("^" + artist.toLowerCase(), "i")
          })
            .then(async (result) => {
              setTimeout(async () => {
                return result;
              }, 1000);
            });
        } else {
          setTimeout(async () => {
            return result;
          }, 1000)
        }
      });
  } catch (err) {
    return err;
  }
}