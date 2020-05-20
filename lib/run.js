require('dotenv').config()
const { v4: uuid } = require('uuid')
const { ZeitClient } = require('@zeit/integration-utils')

const {
  getConnectionKey,
  getConnectionValue,
  getDeploymentId
} = require('./utils')
const { createDB, waitOnAvailable } = require('./aws')

const CONNECTION_TYPES = {
  postgres: 'postgres',
  mysql: 'postgres'
}

const run = async () => {
  const zeitClient = new ZeitClient({ token: process.env.TOKEN_VERCEL })
  const projectId = 'boiler'
  const deploymentId = getDeploymentId()
  const connectionDetails = await createDB(deploymentId)

  // wait until db is ready
  await waitOnAvailable(connectionDetails.resourceArn)

  if (!deploymentId) {
    const res = await zeitClient.fetchAndThrow(
      `/v1/projects/${projectId}/env`,
      {
        method: 'post',
        data: {
          key: 'VERCEL_URL',
          value: ''
        }
      }
    )

    throw new Error(
      `A vercel URL is not populated in the build.env we have now set it via the api
      If you are running locally please run now env pull and then run now deploy.
      If running from the vercel CI kick off another build`
    )
  }

  console.log(JSON.stringify(connectionDetails))

  const secretName = await zeitClient.ensureSecret(
    `${deploymentId}-connection-details`,
    JSON.stringify(connectionDetails)
  )

  try {
    const res = await zeitClient.fetchAndThrow(
      `/v1/projects/${projectId}/env`,
      {
        method: 'post',
        data: {
          key: getConnectionKey('postgres'),
          value: `@${secretName}`
        }
      }
    )
  } catch (err) {
    throw new Error(`[could not create env: ${deploymentId}]: ${err.message}`)
  }
}

run()
  .then(() => console.log('done!'))
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
