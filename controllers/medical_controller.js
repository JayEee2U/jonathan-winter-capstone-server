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

// POST/CREATE new medical file info ---------

const add = async (req, res) => {
    if (
        !req.body.gender ||
        !req.body.vaccinations ||
        !req.body.family_history ||
        !req.body.current_conditions ||
        !req.body.medications ||
        !req.body.concerns 
    ) {
      return res.status(400).json({
        message: "Please fill out all fields as required",
      });
    }

    try {
        const result = await knex("medical").insert(req.body);
    
        const newMedicalId = result[0];
        const createdMedical = await knex("medical").where({ id: newMedicalId });
    
        res.status(201).json(createdMedical);
    } catch (error) {
        res.status(500).json({
          message: `Unable to create a new medical file: ${error}`,
        });
    }
};

// UPDATE a medical file ---------

const update = async (req, res) => {
    try {
      const rowsUpdated = await knex("medical")
        .where({ id: req.params.id })
        .update(req.body);
  
      if (rowsUpdated === 0) {
        return res.status(404).json({
          message: `User with medical file ID ${req.params.id} not found` 
        });
      }
  
      const updatedMedical = await knex("medical")
        .where({
          id: req.params.id,
        });
      
      res.json(updatedMedical[0]);
    } catch (error) {
      res.status(500).json({
        message: `Unable to update user with medical file ID ${req.params.id}: ${error}` 
      });
    }
  };

// DELETE a medical file  ---------

const remove = async (req, res) => {
    try {
      const rowsDeleted = await knex("medical")
        .where({ id: req.params.id })
        .delete();
  
      if (rowsDeleted === 0) {
        return res
          .status(404)
          .json({ message: `User with medical file ID ${req.params.id} not found` });
      }
  
      // No Content response
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: `Unable to delete medical file: ${error}`
      });
    }
  };

  module.exports = {
    index,
    findOne,
    add,
    update,
    remove,
  }
