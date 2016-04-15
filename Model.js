var bookshelf = require('./config');

var Post, Author, Category;

module.exports.Post = bookshelf.Model.extend({
    table: 'posts',
    author: function () {
        return this.hasOne(Author);
    },
    hasTimestamps: true,

    categories: function () {
        return this.belongsToMany(Category)
    }
});

module.exports.Author = bookshelf.Model.extend({
    table: 'authors'
});

module.exports.Category = bookshelf.Model.extend({
    table: 'categories',
    hasTimestamps: true,

    posts: function () {
        return this.hasMany(Post)
    }
});