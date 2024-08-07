/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('medical').del();
    await knex('medical').insert([
        {
            id: 1,
            gender: "female",
            vaccinations: "chickenpox, Flu, Tetanus, COVID",
            family_history: "There has been a history of high blood pressure in the family",
            current_conditions: "No medical issues at this time",
            medications: "Not taking any medications",
            concerns: "I am not sleeping well. I tend to wake up not feeling refreshed from sleep.",
            user_id: 2
        },
        {
            id: 2,
            gender: "non-binary",
            vaccinations: "chickenpox, COVID, diptheria, Flu, Hepatits B, HPV, Tetanus  ",
            family_history: "No family history that I am aware of.",
            current_conditions: "I am uncomfortable with my weight",
            medications: "Not taking any medications",
            concerns: "I am not sleeping well. I tend to wake up not feeling refreshed from sleep.",
            user_id: 3
        },
        {
            id: 3,
            gender: "female",
            vaccinations: "UNKOWN ",
            family_history:"On my father's side of the family there's a history of hypertension, but on my mother's side there's nothing",
            current_conditions: "No medical issues at this time",
            medications: "I have been taking pain medication off and on for a back issue from my past",
            concerns: "Occasional numbness in my left leg.",
            user_id: 4
        },
        {
            id: 4,
            gender: "male",
            vaccinations: "chickenpox, COVID, Flu, Measles, Mumps, Tetanus ",
            family_history: "There has been a history of high blood pressure in the family",
            current_conditions: "No medical issues at this time",
            medications: "Not taking any medications",
            concerns: "I am not sleeping well. I tend to wake up not feeling refreshed from sleep.",
            user_id: 1
        },
        {
            id: 5,
            gender: "male",
            vaccinations: "chickenpox, COVID, Flu, Measles, Mumps, Rotavirus, Rubella, Shingles, Tetanus ",
            family_history: "There has been a history of high blood pressure in the family",
            current_conditions: "No medical issues at this time",
            medications: "Not taking any medications",
            concerns: "I am not sleeping well. I tend to wake up not feeling refreshed from sleep.",
            user_id: 5
        },
        // {
        //     id: 6,
        //     gender: "non-binary",
        //     vaccinations: "chickenpox, COVID, Flu, Measles, Mumps, Meningitis, Rotavirus, Shingles, Tetanus ",
        //     family_history: "History of Crohn's disease on my father's side. No knowledge of any serious health history on my mother's side.",
        //     current_conditions: "Crohn's disease",
        //     medications: "Suffer from headaches that I usually take acetaminophen for, and ustekinumab for Crohn's.",
        //     concerns: "Already mentioned.",
        // },
        // {
        //     id: 7,
        //     gender: "female",
        //     vaccinations: "COVID, Flu, Hepatitis B, Hib, Measles, Mumps, Pneumococcal disease, Tetanus ",
        //     family_history: "There has been a history of high blood pressure in the family",
        //     current_conditions: "Diabetic",
        //     medications: "Metformin",
        //     concerns: "All things concidered, I feel like I am in good condition.",
        // },

    ]);
}