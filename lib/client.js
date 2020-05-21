// This is required so config.update takes place.
// It must be required before the data-api-client
require('./aws')
const dataApi = require('data-api-client')

const { promisify } = require('util')
const connectionValue = JSON.parse(process.env.NEXT_SQL_CONNECTION)
const { secretArn, resourceArn, database } = connectionValue
const client = dataApi({ secretArn, resourceArn, database })
module.exports = client
