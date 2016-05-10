var express = require('express');
var app = express();
var http = require('http').Server(app);
var genK = require('./generate');
var datek = require('datek');

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'uet',
        password: 'uetf2016',
        database: 'node',
        charset: 'utf8'
    }
});

/**
 * Response
 * @type {{return: boolean, time: number, result: null}}
 */
var response = {
    return: true,
    time: 0,
    result: null
};

/**
 * Databases
 */
var db = {};
db.authors = knex('authors');
db.posts = knex('posts');
db.categories = knex('categories');


app.get('/', function (req, res) {
    res.send('Hello everyone!');
});

app.get('/test', function (req, res) {
    db.authors.where({
        username: 'max'
    }).then(function (docs) {
        res.json(docs);
    })
});

/**
 * Seed posts
 */
app.get('/seedPosts/:author/:count', function (req, res) {

    var author_id = parseInt(req.params.author);
    var countSeed = parseInt(req.params.count);
    var count = 0;

    for (var i = 0; i < countSeed; i++) {
        db.posts.insert({
            title: genK.generateTitle(),
            content: genK.generateContent(),
            author_id: author_id
        }).then(function (id) {
            count++;

            console.log(count + ' --- ID = ' + id);
        });
    }

    res.json('Seeding!');
});

app.get('/posts', function (req, res) {
    var startTime = datek.getNowTimestamp();

    knex.select('*').from('posts').innerJoin('authors', 'posts.author_id', '=', 'authors.id').limit(10).then(function (posts) {
        var doneTime = datek.getNowTimestamp();
        var sumTime;
        sumTime = doneTime - startTime;

        response.time = sumTime;
        response.result = posts;

        res.json(response);
    });
});

/**
 * Posts paging
 */
app.get('/posts/:page', function (req, res) {

    var startTime = datek.getNowTimestamp();
    var page = parseInt(req.params.page);
    var offset = (page - 1) * 10;

    knex.select('*').from('posts').innerJoin('authors', 'posts.author_id', '=', 'authors.id').offset(offset).limit(10).then(function (posts) {
        var doneTime = datek.getNowTimestamp();
        var sumTime;
        sumTime = doneTime - startTime;

        response.time = sumTime;
        response.result = posts;

        res.json(response);
    });
});

/**
 * Get post by id_
 */
app.get('/post/:id', function (req, res) {
    console.log(req.route.path);

    var id = parseInt(req.params.id);
    var startTime = datek.getNowTimestamp();

    knex.select('posts.*', 'authors.name', 'authors.username').from('posts').innerJoin('authors', 'posts.author_id', '=', 'authors.id').where('posts.id', id).limit(1).first().then(function (post) {
        var doneTime = datek.getNowTimestamp();
        var sumTime;
        sumTime = doneTime - startTime;
        response.time = sumTime;

        if (!post) {
            response.result = null;
            response.return = false;
            response.msg = 'Post not found';
        } else {
            response.return = true;
            response.result = post;
        }

        res.json(response);
    });
});

/**
 * Get post by author id
 */
app.get('/author/:id', function (req, res) {
    console.log(req.route.path);

    var id = parseInt(req.params.id);
    var startTime = datek.getNowTimestamp();

    knex.select('posts.*', 'authors.name', 'authors.username').from('posts').innerJoin('authors', 'posts.author_id', '=', 'authors.id').where('posts.author_id', id).limit(10).then(function (posts) {
        var doneTime = datek.getNowTimestamp();
        var sumTime;
        sumTime = doneTime - startTime;
        response.time = sumTime;

        if (!posts) {
            response.result = null;
            response.return = false;
            response.msg = 'Something went wrong :]';
        } else {
            response.return = true;
            response.result = posts;
        }

        res.json(response);
    });
});

app.get('/countPosts', function (req, res) {
    console.log(req.route.path);

    var startTime = datek.getNowTimestamp();

    db.posts.count('id').then(function (number) {
        var doneTime = datek.getNowTimestamp();
        var sumTime;
        sumTime = doneTime - startTime;
        response.time = sumTime;
        response.result = number;

        res.json(response);
    });
});

app.get('/update/:id/:id_', function (req, res) {
    console.log(req.route.path);

    var id = req.params.id;
    var newId = req.params.id_;

    var startTime = datek.getNowTimestamp();

    db.posts.where('author_id', '=', id).update({author_id: newId}).then(function (number) {
        var doneTime = datek.getNowTimestamp();
        var sumTime;
        sumTime = doneTime - startTime;
        response.time = sumTime;
        response.result = number;

        res.json(response);
    });
});

app.get('/delete/:id', function (req, res) {
    console.log(req.route.path);

    var id = req.params.id;
    var startTime = datek.getNowTimestamp();

    db.posts.where('id', '=', id).del().then(function (number) {
        var doneTime = datek.getNowTimestamp();
        var sumTime;
        sumTime = doneTime - startTime;
        response.time = sumTime;
        response.result = number;

        res.json(response);
    });
});

/**
 * API
 */
app.get('/api/1', function (req, res) {
    var startTime = datek.getNowTimestamp();

    db.posts.count('*').then(function (number) {
        var doneTime = datek.getNowTimestamp();
        var sumTime;
        sumTime = doneTime - startTime;
        response.time = sumTime;
        response.result = number;

        res.json(response);
    });
});

app.get('/api/2', function (req, res) {
    var startTime = datek.getNowTimestamp();

    knex.select('posts.*', 'authors.name', 'authors.username').from('posts').innerJoin('authors', 'posts.author_id', '=', 'authors.id').limit(10).then(function (posts) {
        var doneTime = datek.getNowTimestamp();
        var sumTime;
        sumTime = doneTime - startTime;

        response.time = sumTime;
        response.result = posts;

        res.json(response);
    });
});

app.get('/api/3', function (req, res) {
    var startTime = datek.getNowTimestamp();
    var username = 'max';

    knex.select('posts.*', 'authors.name', 'authors.username').from('posts').innerJoin('authors', 'posts.author_id', '=', 'authors.id').where('authors.username', username).limit(10).then(function (posts) {
        var doneTime = datek.getNowTimestamp();
        var sumTime;
        sumTime = doneTime - startTime;
        response.time = sumTime;

        if (!posts) {
            response.result = null;
            response.return = false;
            response.msg = 'Something went wrong :]';
        } else {
            response.return = true;
            response.result = posts;
        }

        res.json(response);
    });
});

app.get('/api/4', function (req, res) {

    var id = 2356;
    var startTime = datek.getNowTimestamp();

    knex.select('posts.*', 'authors.name', 'authors.username').from('posts').innerJoin('authors', 'posts.author_id', '=', 'authors.id').where('posts.id', id).limit(1).first().then(function (post) {
        var doneTime = datek.getNowTimestamp();
        var sumTime;
        sumTime = doneTime - startTime;
        response.time = sumTime;

        if (!post) {
            response.result = null;
            response.return = false;
            response.msg = 'Post not found';
        } else {
            response.return = true;
            response.result = post;
        }

        res.json(response);
    });
});

app.get('/api/5', function (req, res) {

});

app.get('/api/6', function (req, res) {

});

app.get('/api/7', function (req, res) {

});

/**
 * Server Listen
 */
http.listen(2357, function () {
    console.log('Listening on localhost:2357');
});