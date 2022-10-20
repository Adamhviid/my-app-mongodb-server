import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  idArtist: { type: String, required: true },
  strArtist: { type: String },
  strArtistAlternate: { type: String },
  strLabel: { type: String },
  idLabel: { type: String },
  intFormedYear: { type: String },
  intBornYear: { type: String },
  intDiedYear: { type: String },
  strDisbanded: { type: String },
  strStyle: { type: String },
  strGenre: { type: String },
  strMood: { type: String },
  strWebsite: { type: String },
  strBiographyEN: { type: String },
  strGender: { type: String },
  intMembers: { type: String },
  strCountry: { type: String },
  strCountryCode: { type: String },
  strArtistThumb: { type: String },
  strArtistLogo: { type: String },
  strArtistClearart: { type: String },
  strArtistWideThumb: { type: String },
  strArtistFanart: { type: String },
  strArtistFanart2: { type: String },
  strArtistFanart3: { type: String },
  strArtistBanner: { type: String },
  strMusicBrainzID: { type: String },
  strLastFMChart: { type: String },
});

const Artist = mongoose.model("Artist", artistSchema);

export { Artist, artistSchema };