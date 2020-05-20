const AWS = require('aws-sdk')
const { getConnectionValue } = require('./utils')
const { promisify } = require('util')

const connectionDetails = getConnectionValue('postgres')
const rds = new AWS.RDSDataService()
const execute = promisify(rds.executeStatement).bind(rds)

const query = stmt => {
  return execute({
    sql: stmt,
    ...connectionDetails
  })
}

module.exports = {
  query
}
