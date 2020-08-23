const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

require('./routes')(app)

app.listen('8081', ()=>{
    console.log('Server Online');
})

