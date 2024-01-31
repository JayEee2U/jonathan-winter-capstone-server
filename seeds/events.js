/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('events').del();
    await knex('events').insert([
        {
            title: 'massage appointment',
            start: '2024, 4, 7, 15',
            end: '2024, 4, 7, 16',
            allDay: false,
        },
        {
            title: 'chiropractor appointment',
            start: '2024, 4, 15, 9',
            end:  '2024, 4, 15, 10, 30',
            allDay: false,
        },
        {
            title: 'massage appointment',
            start: '2024, 4, 20',
            end: '2024, 4, 20',
            allDay: true,
        }
    ]);
};