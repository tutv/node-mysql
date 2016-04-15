exports.seed = function (knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('categories').del(),

        // Inserts seed entries
        knex('categories').insert({
            name: 'Android'
        }),
        knex('categories').insert({
            name: 'PHP'
        }),
        knex('categories').insert({
            name: 'Java'
        }),
        knex('categories').insert({
            name: 'dot Net'
        }),
        knex('categories').insert({
            name: 'iOS'
        }),
        knex('categories').insert({
            name: 'Python'
        }),
        knex('categories').insert({
            name: 'Ruby'
        })
    );
};
