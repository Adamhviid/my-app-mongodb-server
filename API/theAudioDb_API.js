import express from "express";
import axios from "axios";

var router = express.Router();
const APIKey = "c0092b6902mshb5ed672ba017d6fp190826jsn09c53c7e81a9"
const APIHost = "theaudiodb.p.rapidapi.com"

//Return artist by artist name
router.get("/search/artist/:artist", (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://theaudiodb.p.rapidapi.com/search.php',
    params: { s: req.params.artist },
    headers: {
      'X-RapidAPI-Key': APIKey,
      'X-RapidAPI-Host': APIHost
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
      'X-RapidAPI-Key': APIKey,
      'X-RapidAPI-Host': APIHost
    }
  };

  axios.request(options).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    throw new Error(error);
  });
})


export default router;