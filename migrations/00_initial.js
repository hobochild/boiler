module.exports = {
  async up(client) {
    client.query(
      `create table if not exists users (
         id uuid primary key,
         password text not null,
         email text not null unique,
        "createdAt" timestamptz not null default now()
    )`
    )
  },
  async down(client) {
    client.query(`drop table if exists users`)
  }
}
