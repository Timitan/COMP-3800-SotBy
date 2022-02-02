const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST || 'kashin.db.elephantsql.com',
    port: env.DB_PORT || '5432',
    user: env.DB_USER || 'vuqsuzod',
    password: env.DB_PASSWORD || 'apQnspKmHu9ChNYnOqZgDiP7pb7LWu72',
    database: env.DB_NAME || 'vuqsuzod',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
