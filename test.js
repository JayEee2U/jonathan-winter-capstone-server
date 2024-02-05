const bcrypt = require("bcrypt");

const salt = "hashtag"
const password = 'password'
const hashedPassword = bcrypt.hashSync(password, 3);
console.log(hashedPassword);



