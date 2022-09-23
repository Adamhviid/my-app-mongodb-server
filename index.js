import express from "express";
import axios from "axios";
import cors from "cors";
import connectMongoDB from "./startup/mongoDB.js";
const PORT = process.env.PORT || 3001;
const app = express();

connectMongoDB();

const APIKey = "c0092b6902mshb5ed672ba017d6fp190826jsn09c53c7e81a9"
const APIHost = "theaudiodb.p.rapidapi.com"

const corsOptions = {
  origin: PORT,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


//Return artist by artist name
app.get("/search/artist/:artist", (req, res) => {
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
    res.json(response.data)
  }).catch(function (error) {
    console.error(error);
  });
})

//return albums by artist name
app.get("/search/albums/:artist", (req, res) => {
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
    console.error(error);
  });
})


