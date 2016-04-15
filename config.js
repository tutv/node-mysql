var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'node',
        charset: 'utf8'
    }
});

var bookshelf = require('bookshelf')(knex);

var Author = bookshelf.Model.extend({
    tableName: 'authors'
});

var Posts = bookshelf.Model.extend({
    tableName: 'posts'
});

var Category = bookshelf.Model.extend({
    tableName: 'users'
});