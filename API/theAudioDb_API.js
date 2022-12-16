import express from "express";
import axios from "axios";
import * as dotenv from 'dotenv'
dotenv.config()

var router = express.Router();

//Return artist by artist name
router.get("/search/artist/:artist", (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://theaudiodb.p.rapidapi.com/search.php',
    params: { s: req.params.artist },
    headers: {
      'X-RapidAPI-Key': process.env.APIKEY,
      'X-RapidAPI-Host': process.env.APIHOST
    }
  };

  axios.request(options).then(function (response) {
    res.json(response.data.artists[0])
  }).catch(function (error) {
    console.error(error);
  });
})

//return albums by artist name
router.get("/search/albums/:artist", (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://theaudiodb.p.rapidapi.com/searchalbum.php',
    params: { s: req.params.artist },
    headers: {
      'X-RapidAPI-Key': process.env.APIKEY,
      'X-RapidAPI-Host': process.env.APIHOST
    }
  };

  axios.request(options).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    throw new Error(error);
  });
})


export default router;