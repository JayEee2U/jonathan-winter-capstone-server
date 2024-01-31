const knex = require("knex")(require('../knexfile'));
require("dotenv").config();

// GET all events -------------

const index = async (_req, res) => {
    try {
      const data = await knex('events');
      res.status(200).json(data);
    } catch(err) {
      res.status(400).send(`Error retrieving Users: ${err}`)
    }
  }

//  GET event by id -----------

const findOne = async (req, res) => {
    try {
      const eventsFound = await knex("events")
        .where({ id: req.params.id });
  
      if (eventsFound.length === 0) {
        return res.status(404).json({
          message: `Event with ID ${req.params.id} not found` 
        });
      }
  
      const eventData = eventsFound[0];
      res.json(eventData);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve event data for user with ID ${req.params.id}`,
      });
    }
  };
  
  module.exports = {
    index, 
    findOne,
  }