// import seed data files, arrays of objects
const usersData = require('../seeds-data/users');
const eventsData = require('../seed-data/events');

exports.seed = async function(knex) {
  await knex('event').del();
  await knex('user').del();
  await knex('user').insert(usersData);
  await knex('event').insert(eventsDataData);
};