require('dotenv').config()
const Storage = require('./storage')
const client = require('../client')
const cli = require('./cli')
const Umzug = require('umzug')

const migrator = new Umzug({
  storage: new Storage(client),
  migrations: {
    params: [client],
    path: process.cwd() + '/migrations'
  }
})

cli(migrator).cli(process.argv.slice(2))
