var knex = require('knex')({
    // TODO: Use Postgres? Sqlite3 should suffice for now!
    client: 'sqlite3',
    connection: {
        filename: "./tcg.sqlite"
    }
});

module.exports = require('bookshelf')(knex);
