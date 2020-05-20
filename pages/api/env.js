export default (req, res) => {
  res.status(200).send(process.env[process.env.VERCEL_URL.toUpperCase()])
}
