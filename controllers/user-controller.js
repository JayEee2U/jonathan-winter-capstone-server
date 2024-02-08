const knex = require("knex")(require('../knexfile'));
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize");

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
        .join("events", "users.id", "events.user_id")
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
        !req.body.email||
        !req.body.password

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

  // POST to '/users/register', creating a new user --------;

  const register = async (req, res) => {
    const { first_name, last_name, date_of_birth, email, password } = req.body;

    if (!first_name || !last_name || !date_of_birth || !email || !password) {
        return res.status(400).send('Please enter all required fields');
    }
  
    const hashedPassword = bcrypt.hashSync(password, 3);
  
    const newUser = {
        first_name,
        last_name,
        date_of_birth,
        email,
        password: hashedPassword,
    };
  
    try {
  

        await knex('users').insert(newUser);
        const user = await knex('users').where({email: email }).first();

        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_KEY,
          { expiresIn: '24h' }
      );
        res.status(201).json({ token: token });

    } catch (err) {
        console.log(err);
        res.status(400).send('Failed registration');
    }
  
};

//  POST '/users/login  -----------

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).send('Plese enter all required fields');
  }

  const user = await knex('users').where({email: email }).first();

  if (!user) {
      return res.status(400).send('Invalid email');
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) {
      return res.status(400).send('Invalid password');
  }

  const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: '24h' }
  );

  res.json({ token: token });

  res.status(200);
};

//  GET '/users/current

const current = async ( req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send('Please login');
}
console.log(req.headers.authorization);

const authHeader = req.headers.authorization;

const authToken = authHeader.split(' ')[1];

try {

    const decoded = jwt.verify(authToken, process.env.JWT_KEY);
    console.log(decoded); 

    const user = await knex('users').where({ id: decoded.id }).first();

    delete user.password;

   res.json(user); 
} catch (err) {
    return res.status(401).send('Invalid auth token:');
}
}

module.exports = {
    index,
    findOne,
    posts,
    add,
    update,
    remove,
    medical,
    register,
    login,
    current
  }