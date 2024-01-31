/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('events').del();
    await knex('events').insert([
        {
            user_id: 3,
            title: 'massage appointment',
            location: '',
            start_time: new Date(2024, 4, 7, 15),
            end_time: new Date (2024, 4, 7, 16),
            all_day: false,
        },
        {
            user_id: 3,
            title: 'chiropractor appointment',
            location: '',
            start_time: new Date(2024, 4, 15, 9),
            end_time: new Date (2024, 4, 15, 10, 30),
            all_day: false,
        },
        {
            user_id: 3,
            title: 'massage appointment',
            location: '',
            start_time: new Date(2024, 4, 20),
            end_time: new Date (2024, 4, 20),
            all_day: true,
        },
    ]);
};