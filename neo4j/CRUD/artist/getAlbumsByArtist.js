async function getAlbumsByArtist(driver, artistName) {
  const session = driver.session({ database: 'neo4j' });

  const query = `
    MATCH (a1:Artist)-[:OWNS]->(a2:Album)
    WHERE a1.name = $artistName
    RETURN a2
  `;

  try {
    const result = await session.run(query, { artistName });
    const albums = result.records.map(record => record.get('a2').properties);
    return albums;
  } catch (error) {
    console.error(`Something went wrong: ${error}`);
  } finally {
    await session.close();
  }
}

export default getAlbumsByArtist;