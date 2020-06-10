import client from 'nawr/client'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 8

export const createUser = async ({ email, password }) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS)

  const newUser = { email, password: hash, id: uuid() }
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
