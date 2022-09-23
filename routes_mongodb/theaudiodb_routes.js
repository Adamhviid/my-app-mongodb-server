import axios from "axios";
import express from "express";

const router = express.Router();

//Return artist by artist name
router.get("/", async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://theaudiodb.p.rapidapi.com/search.php',
    params: { s: req.params.artist },
    headers: {
      'X-RapidAPI-Key': "c0092b6902mshb5ed672ba017d6fp190826jsn09c53c7e81a9",
      'X-RapidAPI-Host': "theaudiodb.p.rapidapi.com"
    }
  };

  axios.request(options).then(function (response) {
    res.json(response.data)
  })
})

export default router;