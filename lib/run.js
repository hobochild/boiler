const envfile = require('envfile')
const { v4: uuid } = require('uuid')
const { promisify } = require('util')
const path = require('path')
const fs = require('fs').promises
// const { ZeitClient } = require('@zeit/integrations')

const run = async () => {
  // const zeitClient = ZeitClient({ token: process.env.TOKEN_VERCEL })
  const envFilePath = path.join(process.cwd(), '.env')
  let env

  // always use an .env file if available
  try {
    await fs.access(envFilePath)
    env = envfile.parseFileSync(envFilePath)
  } catch (err) {
    // .env doesnt exist
    env = {}
  }

  const deploymentId = process.env.VERCEL_URL || env.VERCEL_URL

  try {
    const envStr = envfile.stringifySync({
      ...env,
      POSTGRES_CONNECTION_URL: uuid(),
      [deploymentId]: uuid()
    })

    await fs.writeFile(envFilePath, envStr)
  } catch (err) {
    console.log('couldnt write .env')
  }
}

run()
  .then(() => console.log('done!'))
  .catch(console.log)
