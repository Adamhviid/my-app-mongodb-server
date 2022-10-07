import express from "express";
import cors from "cors";
import connectMongoDB from "./startup/mongoDB.js";
import API from "./API/theAudioDb_API.js";

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
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});





