import client from 'nawr/client'
import { v4 as uuid } from 'uuid'

export const createUser = async ({ email, password }) => {
  const newUser = { email, password, id: uuid() }
  await client.query(
    `INSERT INTO users (email,password,id) VALUES(:email,:password, uuid(:id))`,
    newUser
  )

  return newUser
}

export const getUserByEmail = async email => {
  const { records } = await client.query(
    `select * from users where email = :email`,
    {
      email
    }
  )

  return records[0]
}
