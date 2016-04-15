var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'uet',
        password: 'uetf2016',
        database: 'node',
        charset: 'utf8'
    }
});

module.exports = require('bookshelf')(knex);