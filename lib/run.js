const envfile = require('envfile')
const { v4: uuid } = require('uuid')
const { promisify } = require('util')
const path = require('path')
const fs = require('fs').promises
const { ZeitClient } = require('@zeit/integration-utils')

const run = async () => {
  const zeitClient = new ZeitClient({ token: process.env.TOKEN_VERCEL })
  const projectId = 'boiler'

  const vercelURL = process.env.VERCEL_URL
  if (!VERCEL_URL) {
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
      'A vercel URL is not populated in the build.env we have now set it via the api. Please run again.'
    )
  }

  const res = await zeitClient.fetchAndThrow(`/v1/projects/${projectId}/env`, {
    method: 'post',
    data: {
      key: vercelURL,
      value: uuid()
    }
  })

  // const envFilePath = path.join(process.cwd(), '.env')
  // let env

  // // always use an .env file if available
  // try {
  // await fs.access(envFilePath)
  // env = envfile.parseFileSync(envFilePath)
  // } catch (err) {
  // // .env doesnt exist
  // env = {}
  // }

  // const deploymentId = process.env.VERCEL_URL

  // try {
  // const envStr = envfile.stringifySync({
  // ...env,
  // POSTGRES_CONNECTION_URL: uuid(),
  // [deploymentId]: uuid()
  // })

  // await fs.writeFile(envFilePath, envStr)
  // } catch (err) {
  // console.log('couldnt write .env')
  // }
}

run()
  .then(() => console.log('done!'))
  .catch(console.log)
  .catch(console.log)
