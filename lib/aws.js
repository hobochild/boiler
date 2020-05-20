const { v4: uuid } = require('uuid')
const AWS = require('aws-sdk')
const { promisify } = require('util')

const rds = new AWS.RDS()
const secretsmanager = new AWS.SecretsManager()
const createSecret = promisify(secretsmanager.createSecret).bind(secretsmanager)
const createDBCluster = promisify(rds.createDBCluster).bind(rds)

const getDBs = promisify(rds.describeDBClusters).bind(rds)

async function getDBStatus(dbArn) {
  const { DBClusters } = await getDBs({
    DBClusterIdentifier: dbArn
  })

  const [db] = DBClusters
  if (!db) {
    throw new Error('Database does not exist')
  }
  return db.Status
}

async function sleep(timeout) {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, timeout)
  })
}

async function waitOnAvailable(dbArn) {
  let status = null

  while (status !== 'available') {
    console.log('checking availablility')
    status = await getDBStatus(dbArn)
    await sleep(5000)
  }

  console.log('DB is ready')
  return status
}

// Creates a serverless postgres db + sercret for acess via the data-api
// * @param {string} deploymentId - vercel deploymentId
async function createDB(identifier) {
  const username = 'vercel'
  const dbName = 'master'
  const password = '123456789'

  let db
  let secret

  try {
    db = await createDBCluster({
      DatabaseName: dbName,
      EngineMode: 'serverless',
      Engine: 'aurora-postgresql',
      EnableHttpEndpoint: true,
      DBClusterIdentifier: identifier,
      MasterUsername: username,
      MasterUserPassword: password,
      ScalingConfiguration: {
        AutoPause: true,
        MaxCapacity: 4,
        MinCapacity: 2,
        SecondsUntilAutoPause: 300
      }
    }).then(data => data.DBCluster)
  } catch (err) {
    throw new Error(`[Could not create DBCluster]: ${err.message}`)
  }

  try {
    secret = await createSecret({
      ClientRequestToken: uuid(),
      Description: 'next-sql-db-password',
      Name: uuid(),
      SecretString: JSON.stringify({
        username: username,
        password: password,
        engine: 'postgres',
        host: db.Endpoint,
        port: 5432,
        dbClusterIdentifier: identifier
      })
    })
  } catch (err) {
    throw new Error(`[Could not create DBCluster secret]: ${err.message}`)
  }

  return {
    resourceArn: db.DBClusterArn,
    secretArn: secret.ARN,
    database: dbName
  }
}

module.exports = {
  createDB,
  waitOnAvailable
}
