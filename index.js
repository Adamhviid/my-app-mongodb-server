import express from "express";
import cors from "cors";
import connectMongoDB from "./mongodb/startup_mongoDB.js";
import Api from "./API/theAudioDb_API.js";
import Artist from "./mongodb/routes/artists.js";
import Album from "./mongodb/routes/albums.js";
import User from "./mongodb/routes/users.js";

const PORT = process.env.PORT || 3001;
const app = express();

connectMongoDB();

const corsOptions = {
  origin: PORT,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use('/api', Api);
app.use('/db', Artist)
app.use('/db', Album)
app.use(express.json());
app.use('/auth', User)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});





