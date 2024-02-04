const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
require("dotenv").config();

const eventRoutes = require('./routes/event-routes');
const medicalRoutes = require('./routes/medical-routes');
const userRoutes = require('./routes/user-routes');

app.use(express.json());
app.use(cors({origin: '*' }));

app.use('/events', eventRoutes);
app.use('/medical', medicalRoutes);
app.use('/users', userRoutes);


app.use('/', (req, res) => {
  res.send('Welcome!')
});



app.listen(port, () => {
  console.log(`Running and listening on port ${port}`)
});