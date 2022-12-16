async function login(driver, email, password) {
  const session = driver.session({ database: 'neo4j' });

  const query = `
    MATCH (u:User { email: $email })
    WHERE u.password = $password
    RETURN u
  `;

  try {
    const result = await session.run(query, { email, password });
    if (result.records.length > 0) {
      const user = result.records[0].get('u').properties;
      res.status(200).send('User logged in');
      return user;
    } else {
      return null;
    }
  } catch (error) {
    res.status(500).send('Something went wrong' + error);
  } finally {
    await session.close();
  }
}

export default login;