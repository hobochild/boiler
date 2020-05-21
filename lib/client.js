const { AWS } = require('./aws')
const { promisify } = require('util')
const connection = JSON.parse(process.env.NEXT_SQL_CONNECTION)

console.log({ connection })

const rds = new AWS.RDSDataService()
const execute = promisify(rds.executeStatement).bind(rds)

const query = stmt => {
  return execute({
    sql: stmt,
    ...connection
  })
}

module.exports = {
  query
}
