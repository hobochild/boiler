export default (req, res) => {
  const [deploymentId] = process.env.VERCEL_URL.split('.')
  console.log(process.env[deploymentId])
  res.status(200).send(process.env[deploymentId.toUpperCase()])
}
