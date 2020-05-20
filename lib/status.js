require('dotenv').config()
const { waitOnAvailable } = require('./aws')

waitOnAvailable('arn:aws:rds:us-east-1:917491943275:cluster:ha')
  .then(console.log)
  .catch(console.log)
