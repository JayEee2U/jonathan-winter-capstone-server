const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;


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
  res.send('Hello World!')
})
app.get('/events', (req, res) => {
    res.json(events)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})