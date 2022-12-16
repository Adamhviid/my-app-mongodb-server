async function register() {
  const session = driver.session({ database: 'neo4j' });

  const params = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    const writeQuery = `
      MERGE (u:User { email: $email })
      SET u.password = $password
      RETURN u
    `;

    await session.executeWrite(tx =>
      tx.run(writeQuery, params)
    );

    res.status(200).send('User created');

  } catch (error) {
    res.status(500).send('Something went wrong');
  } finally {
    await session.close();
  }
}