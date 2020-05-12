// Update with your config settings.

module.exports = {

  development: {
    lient: 'postgresql',
    connection: {
      database: 'novastride',
      user:     'postgres',
      password: 'postgres'
    },
    migrations: {
      directory: __dirname + "/migrations"
    },
    seeds: {
      directory: __dirname + "/seeds"
    }
  }
};
