import axios from "axios";
import { Artist } from "../models/artist.js";

export default async function Artists(artist) {
  try {
    const result = await Artist.findOne({
      strArtist: new RegExp("^" + artist.toLowerCase(), "i")
    })
    if (result === null || result.length === 0) {
      const { data } = await axios.get(
        `${process.env.PORT}` + "/api/search/artist/" + artist
      );
      const newArtist = new Artist(data)
      await newArtist.save();
      await Artist.findOne({
        strArtist: new RegExp("^" + artist.toLowerCase(), "i")
      })
        .then(async (result) => {
          setTimeout(() => {
            return result;
          }, 5000);
        });
    }
    return result;
  } catch (err) {
    return err;
  }
}