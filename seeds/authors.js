exports.seed = function (knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('authors').del(),

        // Inserts seed entries
        knex('authors').insert({
            name: 'Tu Tran',
            username: 'max'
        })
    );
};
