require('dotenv').config()

module.exports = (phase, { defaultConfig }) => {
  return {
    env: {
      NEXT_SQL_CONNECTION: process.env.NEXT_SQL_CONNECTION
    }
  }
}
