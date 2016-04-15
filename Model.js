var bookshelf = require('./config');

var Post, Author, Category;

Post = bookshelf.Model.extend({
    table: 'posts',
    author: function () {
        return this.hasOne(Author);
    },
    categories: function () {
        return this.belongsToMany(Category)
    }
});

Author = bookshelf.Model.extend({
    table: 'authors',
    posts: function () {
        return this.hasMany(Post)
    }
});

Category = bookshelf.Model.extend({
    table: 'categories',
    posts: function () {
        return this.hasMany(Post)
    }
});