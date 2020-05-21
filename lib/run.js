require('dotenv').config()
const envfile = require('envfile')
const fs = require('fs').promises
const { DIR } = require('./constants')
const { createDB, waitOnAvailable } = require('./aws')
const path = require('path')
const { nanoid } = require('nanoid')

const CONNECTION_TYPES = {
  postgres: 'postgres',
  mysql: 'postgres'
}

const run = async () => {
  if (process.env.NEXT_SQL_CONNECTION) {
    console.log('connection details exist ignoring')
  }

  const CWD = process.cwd()
  const buildId = nanoid()

  const connectionValues = await createDB(buildId)
  await waitOnAvailable(connectionValues.resourceArn)

  const envFilePath = path.join(CWD, '.env')
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
      NEXT_SQL_CONNECTION: JSON.stringify(connectionValues)
    })

    await fs.writeFile(envFilePath, envStr)
  } catch (err) {
    console.log('couldnt write .env')
  }
  return 'DONE'
}

run()
  .then(console.log)
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
