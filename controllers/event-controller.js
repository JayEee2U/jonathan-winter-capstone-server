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

  // POST/CREATE a new event ---------

const add = async (req, res) => {
  if (
    !req.body.title ||
    !req.body.location ||
    !req.body.start_time ||
    !req.body.end_time ||
    !req.body.all_day ||
    !req.body.user_id
    ) {
    return res.status(400).json({
      message: "Please fill out all event fields",
    });
  }

  try {
    const result = await knex("events").insert(req.body);

    const newEventId = result[0];
    const createdEvent = await knex("events").where({ id: newEventId });

    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user: ${error}`,
    });
  }
};

//  UPDATE an event --------

const update = async (req, res) => {
    try {
      const eventsUpdated = await knex("events")
        .where({ id: req.params.id })
        .update(req.body);
  
      if (eventsUpdated === 0) {
        return res.status(404).json({
          message: `User with ID ${req.params.id} not found` 
        });
      }
  
      const updatedEvent = await knex("events")
        .where({
          id: req.params.id,
        });
      
      res.json(updatedEvent[0]);
    } catch (error) {
      res.status(500).json({
        message: `Unable to update user with ID ${req.params.id}: ${error}` 
      });
    }
  };

// DELETE an event ------

const remove = async (req, res) => {
    try {
      const rowsDeleted = await knex("events")
        .where({ id: req.params.id })
        .delete();
  
      if (rowsDeleted === 0) {
        return res
          .status(404)
          .json({ message: `User with event ID ${req.params.id} not found` });
      }
  
      // No Content response
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: `Unable to delete event: ${error}`
      });
    }
  };


  module.exports = {
    index, 
    findOne,
    add,
    update,
    remove,
  };