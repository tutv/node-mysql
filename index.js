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
app.get('/seedPosts/:author', function (req, res) {

    var author_id = parseInt(req.params.author);
    var count = 0;

    for (var i = 0; i < 2000; i++) {
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
    
    db.posts.where({}).limit(10).then(function (posts) {
        var doneTime = datek.getNowTimestamp();
        var sumTime;
        sumTime = doneTime - startTime;
        response.time = sumTime;
        response.result = posts;

        res.json(response);
    })
});

/**
 * Posts paging
 */
app.get('/posts/:page', function (req, res) {

    var startTime = datek.getNowTimestamp();
    var page = parseInt(req.params.page);
    var offset = (page - 1) * 10;

    db.posts.where({}).offset(offset).limit(10).then(function (posts) {
        var doneTime = datek.getNowTimestamp();
        var sumTime;
        sumTime = doneTime - startTime;

        response.time = sumTime;
        response.result = posts;

        res.json(response);
    })
});


/**
 * Server Listen
 */
http.listen(2357, function () {
    console.log('Listening on localhost:2357');
});