async function createAlbumOwner(driver, artist, album) {
  const session = driver.session({ database: 'neo4j' });

  const params = {
    artist: artist,
    idAlbum: album.idAlbum,
    idArtist: album.idArtist,
    idLabel: album.idLabel,
    strAlbum: album.strAlbum,
    strAlbumStripped: album.strAlbumStripped,
    strArtist: album.strArtist,
    intYearReleased: album.intYearReleased,
    strStyle: album.strStyle,
    strGenre: album.strGenre,
    strLabel: album.strLabel,
    strReleaseFormat: album.strReleaseFormat,
    strAlbumThumb: album.strAlbumThumb,
    strAlbumCDart: album.strAlbumCDart,
    strDescriptionEN: album.strDescriptionEN
  };

  try {
    const writeQuery = `
      MERGE (a1:Artist { name: $artist})
      MERGE (a2:Album {
        idAlbum: $idAlbum,
        idArtist: $idArtist,
        strAlbum: $strAlbum,
        strAlbumStripped: $strAlbumStripped,
        strArtist: $strArtist,
        intYearReleased: $intYearReleased,
        strStyle: $strStyle,
        strGenre: $strGenre,
        strLabel: COALESCE($strLabel, ""),
        strReleaseFormat: COALESCE($strReleaseFormat, ""),
        strAlbumThumb: COALESCE($strAlbumThumb, ""),
        strAlbumCDart: COALESCE($strAlbumCDart, ""),
        strDescriptionEN: COALESCE($strDescriptionEN, "")
      })
      MERGE (a1)-[:OWNS]->(a2)
      RETURN a1, a2
    `;

    await session.executeWrite(tx =>
      tx.run(writeQuery, params)
    );

  } catch (error) {
  } finally {
    await session.close();
  }
}

export default createAlbumOwner;



