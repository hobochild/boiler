import { getConnectionValue } from '../../lib/utils'

export default (req, res) => {
  const connection_string = getConnectionValue('postgres')
  res.status(200).send(connection_string)
}
