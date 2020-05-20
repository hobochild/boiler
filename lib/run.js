const envfile = require('envfile')
const { v4: uuid } = require('uuid')
const { promisify } = require('util')
const path = require('path')
const fs = require('fs').promises

const run = async () => {
  const envFilePath = path.join(process.cwd(), '.env')
  let env

  // always use an .env file if available
  try {
    await fs.access(envFilePath)
    env = envfile.parseFileSync(envFilePath)
  } catch (err) {
    // doesnt exist
    env = {}
  }

  try {
    const envStr = envfile.stringifySync({
      ...env,
      POSTGRES_CONNECTION_URL: uuid(),
      VERCEL_URL: process.env.VERCEL_URL
    })

    await fs.writeFile(envFilePath, envStr)
  } catch (err) {
    console.log('couldnt write .env')
  }

  console.log('DONE')
}

run()
  .then(() => console.log('done!'))
  .catch(console.log)
