const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize");
const { debug } = require("console");


// POST to '/users/register', creating a new user --------

router.post('/register', async (req, res) => {

    const { first_name, last_name, date_of_birth, email, password } = req.body;

    if (!first_name || !last_name || !date_of_birth || !email || !password) {
        return res.status(400).send('Please enter all required fields');
    }

    const hashedPassword = bcrypt.hashSync(password);

    const newUser = {
        first_name,
        last_name,
        date_of_birth,
        email,
        password: hashedPassword,
    };

    try {

        await knex('users').insert(newUser);
        res.status(201).send('Registered successfully!');
    } catch (err) {
        console.log(err);
        res.status(400).send('Failed registration');
    }
});

//  POST '/users/login  -----------

router.post('login', async(req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Plese enter all required fields');
    }

    const user = (await knex('users')).where({email: email }).first();

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
});

//  GET '/users/current

router.get('/current', async (req, res) =>{

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
        return res.status(401).send('Invalid auth token:' ,err);
    }
});

//  USE of middleware function authorized  -------

router.get('/', authorize, async ( req, res) => {

    try {
        const users = await knex.select('*').from.apply('users');

        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Unabel to retrieve users datat'});
    }
});

module.exports = router;