/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      id: 1,
      first_name: "Nester",
      last_name:"Brookfield",
      date_of_birth:"1985-06-03",
      email: "nbrookfield0@feedburner.com",
    },
    {
      id: 2,
      first_name: "Esme",
      last_name:"Ayscough",
      date_of_birth:"1980-11-26",
      email: "eayscough1@pagesperso-orange.fr",
    },
    {
      id: 3,
      first_name: "Danni",
      last_name:"McOnie",
      date_of_birth:"1991-02-19",
      email: "dmconie2@netscape.com",
    },
    {
      id: 4,
      first_name: "Horatia",
      last_name:"Dalyiel",
      date_of_birth:"1991-02-19",
      email: "hdalyiel3@fc2.com",
    },
    {
      id: 5,
      first_name: "Mohandis",
      last_name:"Nibley",
      date_of_birth:"1962-11-10",
      email: "mnibley4@marketwatch.com",
    },      
  ]);
}

