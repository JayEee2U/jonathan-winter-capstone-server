const knex = require("knex")(require('../knexfile'));
require("dotenv").config();

//  GET all users -----------------

const index = async (_req, res) => {
    try {
        const data = await knex('users');
        res.status(200).json(data);
    } catch(err) {
        res.status(400).send(`Error retrieving Users: ${err}`);
    }
  };

// GET one user by id ------------

const findOne = async (req, res) => {
    try {
        const usersFound = await knex("users")
        .where({ id: req.params.id });
  
      if (usersFound.length === 0) {
        return res.status(404).json({
            message: `User with ID ${req.params.id} not found` 
        });
      }
  
      const userData = usersFound[0];
      res.json(userData);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve user data for user with ID ${req.params.id}`,
      });
    }
  };
  
//  POST

const posts = async (req, res) => {
    try {
      const posts = await knex("users")
        .join("users", "users.events_id", "events.id")
        .where({ user_id: req.params.id });
  
      res.json(posts);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve events for user with ID ${req.params.id}: ${error}`,
      });
    }
  };

// POSt/CREATE a new user ---------------

const add = async (req, res) => {
    if (
        !req.body.first_name ||
        !req.body.last_name ||
        !req.body.date_of_birth ||
        !req.body.email
    ) {
      return res.status(400).json({
        message: "Please fill out all the form fields",
      });
    }
    try {
        const result = await knex("users").insert(req.body);
    
        const newUserId = result[0];
        const createdUser = await knex("users").where({ id: newUserId });
    
        res.status(201).json(createdUser);
      } catch (error) {
        res.status(500).json({
          message: `Unable to create new user: ${error}`,
        });
      }
    };

// UPDATE a  user ---------------

const update = async (req, res) => {
    try {
      const usersUpdated = await knex("users")
        .where({ id: req.params.id })
        .update(req.body);
  
      if (usersUpdated === 0) {
        return res.status(404).json({
          message: `User with ID ${req.params.id} not found` 
        });
      }
  
      const updatedUser = await knex("users")
        .where({
          id: req.params.id,
        });
      
      res.json(updatedUser[0]);
    } catch (error) {
      res.status(500).json({
        message: `Unable to update user with ID ${req.params.id}: ${error}` 
      });
    }
  };

//    DELETE a user -----------

const remove = async (req, res) => {
    try {
      const rowsDeleted = await knex("users")
        .where({ id: req.params.id })
        .delete();
  
      if (rowsDeleted === 0) {
        return res
          .status(404)
          .json({ message: `User with ID ${req.params.id} not found` });
      }
  
      
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: `Unable to delete user: ${error}`
      });
    }
  };
//  FIND medical information by userId -----

const medical = async(req, res) => {
    try {
        const medicalFound = await knex("medical")
        .where({ user_id: req.params.id });

        if (medicalFound.length === 0) {
            return res.status(404).json({
                message: `Medical record not found` 
            });
          }

          const medicalData = medicalFound[0];
          res.json(medicalData);
        } catch (error) {
          res.status(500).json({
            message: `Unable to retrieve  medical data`,
          });         
    }
  };

module.exports = {
    index,
    findOne,
    posts,
    add,
    update,
    remove,
    medical
  }