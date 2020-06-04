require('dotenv').config()
const { query } = require('../client')

query(`select * from migration;`)
  .then(console.log)
  .catch(console.log)
