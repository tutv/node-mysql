// Update with your config settings.

module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'uet',
            password: 'uetf2016',
            database: 'node',
            charset: 'utf8'
        }
    },

    staging: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'uet',
            password: 'uetf2016',
            database: 'node',
            charset: 'utf8'
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'uet',
            password: 'uetf2016',
            database: 'node',
            charset: 'utf8'
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
