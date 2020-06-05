module.exports = {
  async up(client) {
    await client.query(`INSERT INTO users (name) VALUES(:name)`, [
      [{ name: 'Marcia' }],
      [{ name: 'Peter' }],
      [{ name: 'Jan' }],
      [{ name: 'Cindy' }],
      [{ name: 'Bobby' }]
    ])
  }
}
