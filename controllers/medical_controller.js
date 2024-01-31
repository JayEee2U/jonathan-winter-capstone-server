const knex = require("knex")(require('../knexfile'));
require("dotenv").config();

// GET all medical info -----

const index = async (_req, res) => {
    try {
      const data = await knex('medical');
      res.status(200).json(data);
    } catch(err) {
      res.status(400).send(`Error retrieving Users: ${err}`)
    }
  }

// GET one 

const findOne = async (req, res) => {
    try {
        const medicalFound = await knex('medical')
        .where({ id: req.params.id });
  
      if (medicalFound.length === 0) {
        return res.status(404).json({
            message: `Medical data with ID ${req.params.id} not found` 
        });
      }
  
      const medicalData = medicalFound[0];
      res.json(medicalData);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve medical data for user with ID ${req.params.id} due to ${err}`,
      });
    }
  };
  
  module.exports = {
    index,
    findOne,
  }
