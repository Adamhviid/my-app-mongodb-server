import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  idAlbum: { type: String, required: true },
  idArtist: { type: String },
  idLabel: { type: String },
  strAlbum: { type: String },
  strAlbumStripped: { type: String },
  strArtist: { type: String },
  intYearReleased: { type: String },
  strStyle: { type: String },
  strGenre: { type: String },
  strLabel: { type: String },
  strReleaseFormat: { type: String },
  strAlbumThumb: { type: String },
  strAlbumCDart: { type: String },
  strDescriptionEN: { type: String },
});

const Album = mongoose.model("Album", albumSchema);

export { Album, albumSchema };