const express = require('express');
const config = require('./config/');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let book = require('./routes/book');
const app = express();
//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

const port = 3001;

mongoose.connect(config.dbConfig.uri, config.dbConfig.options).then((err, client) => {
    console.log('We have connected to local db');
}).catch((error) => {
    console.log('Local db connection error');
    console.log(error.message);
});

require('./routes/')(app);

if (!module.parent) {
    app.listen(port, () => console.log(`Listening at ${port}`));
}

module.exports = app;