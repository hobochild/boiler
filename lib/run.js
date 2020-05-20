const envfile = require('envfile')
const uuid = require('uuid/v4')
const { promisify } = require('util')
const parseEnvFile = promisify(envfile.parseFile).bind(envfile)
const stringifyEnvFile = promisify(envfile.stringify).bind(envfile)

const run = async () => {
  const env = await parseEnvFile()
  await stringifyEnvFile({
    ...env,
    POSTGRES_CONNECTION_URL: uuid(),
    VERCEL_URL: process.env.VERCEL_URL
  })
}

run()
  .then(() => console.log('done!'))
  .catch(console.log)
