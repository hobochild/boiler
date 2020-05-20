const engines = {
  postgres: 'POSTGRES',
  mysql: 'MYSQL'
}

const getDeploymentId = () => {
  if (!process.env.VERCEL_URL) {
    throw new Error('VERCEL_URL is not set')
  }

  const [deploymentId] = process.env.VERCEL_URL.split('.')
  return deploymentId
}

const getConnectionKey = engine => {
  const deploymentId = getDeploymentId()
  return `${engines[engine]}_${deploymentId.toUpperCase().replace(/-/g, '_')}`
}

const getConnectionValue = engine => {
  const connectionKey = getConnectionKey(engine)
  return JSON.parse(process.env[connectionKey])
}

module.exports = {
  getConnectionKey,
  getConnectionValue,
  getDeploymentId
}
