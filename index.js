const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
require("dotenv").config();





app.use(express.json());
app.use(cors());


const events = [
    {
        title: 'massage appointment',
        start: new Date(2024, 4, 7, 15),
        end: new Date (2024, 4, 7, 16),
        allDay: false,
    },
    {
        title: 'chiropractor appointment',
        start: new Date(2024, 4, 15, 9),
        end: new Date (2024, 4, 15, 10, 30),
        allDay: false,
    },
    {
        title: 'massage appointment',
        start: new Date(2024, 4, 20),
        end: new Date (2024, 4, 20),
        allDay: true,
    }
]

app.get('/', (req, res) => {
  res.send('Welcome!')
})
app.get('/events', (req, res) => {
    res.json(events)
})

app.get('/users', (req, res) => {
    res.json(users)
 })

app.listen(port, () => {
  console.log(`Running and listening on port ${port}`)
})