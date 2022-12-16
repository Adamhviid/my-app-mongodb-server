import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectMongoDB from "./mongodb/startup_mongoDB.js";
import Api from "./API/theAudioDb_API.js";
import Artist from "./mongodb/routes/artists.js";
import Album from "./mongodb/routes/albums.js";
import Login from "./mongodb/routes/Users/login.js";
import Register from "./mongodb/routes/Users/register.js";
import GetUser from "./mongodb/routes/Users/getUser.js";

import Neo4jAlbums from "./mongodb/routes/neo4jAlbums.js";

const PORT = process.env.PORT || 3001;
const app = express();

connectMongoDB();

const corsOptions = {
  origin: PORT,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api', Api);
app.use('/db', Artist)
app.use('/db', Neo4jAlbums)
app.use('/auth', Login)
app.use('/auth', Register)
app.use('/auth', GetUser)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});





