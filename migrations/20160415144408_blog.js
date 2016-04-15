exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('posts', function (table) {
            table.increments('id').primary();

            table.text('title');
            table.longText('content');
            table.integer('author_id');

            table.timestamps();
        }),

        knex.schema.createTable('authors', function (table) {
            table.increments('id').primary();

            table.string('username');
            table.string('name');

            table.timestamps();
        }),
        knex.schema.createTable('categories', function (table) {
            table.increments('id').primary();

            table.string('name');

            table.timestamps();
        }),
        knex.schema.createTable('post_categories', function (table) {
            table.increments('id').primary();

            table.integer('post_id');
            table.integer('category_id');

            table.index('post_id');
            table.index('category_id');

            table.timestamps();
        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('posts'),
        knex.schema.dropTable('authors'),
        knex.schema.dropTable('categories'),
        knex.schema.dropTable('post_categories')
    ])
};
