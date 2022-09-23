import express from "express";
import AudiodbRouter from "../routes_mongodb/theaudiodb_routes.js";

export default function (app) {
  app.use(express.json());
  app.use("/search/artist/:artist", AudiodbRouter);

}