import express from "express";
import cors from "cors";
import connectMongoDB from "./mongodb/startup_mongoDB.js";
import API from "./API/theAudioDb_API.js";
import routes from "./mongodb/routes/artists.js";

const PORT = process.env.PORT || 3001;
const app = express();

connectMongoDB();

const corsOptions = {
  origin: PORT,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use('/api', API);
app.use('/db', routes)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});





