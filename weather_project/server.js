let projectData = {};

const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 8000;
const server = app.listen(port, () => {
    console.log(`Server running on localhost: ${port}`);
});

app.get('/all', (req, res) => {
    console.log("GET request received");
    res.send(projectData);
});

app.post('/add', (req, res) => {
    console.log("POST request received with data:", req.body);
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        feel: req.body.feel
    };
    res.send(projectData);
});
