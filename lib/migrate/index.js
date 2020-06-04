require('dotenv').config()
const Storage = require('./storage')
const client = require('../client')
const cli = require('./cli')
const Umzug = require('umzug')

module.exports = argv => {
  const migrator = new Umzug({
    storage: new Storage(client),
    migrations: {
      params: [client],
      path: process.cwd() + '/migrations'
    }
  })

  return cli(migrator, argv)
}
