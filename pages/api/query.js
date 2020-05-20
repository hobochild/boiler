import { query } from './../../lib/client'

export default async (req, res) => {
  try {
    const data = await query(`select * from users`)
    return res.status(200).json(data)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
