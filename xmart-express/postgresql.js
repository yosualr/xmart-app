const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_xmart',
  password: 'lamindah21',
  port: 5432,
});

module.exports = pool;
