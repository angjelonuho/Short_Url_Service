const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

//#### Optional code creating db table
//#### not recomended in real-time applications
//#### used for convinience

//Create Conection with mysql


//Connect and create the database
db.connect((err) => {
    if(err){
        return console.error('error: ' + err.message);
    }
    console.log('Connected...');

    let createTableUrls = `create table if not exists urls(
        id int primary key auto_increment,
        urlCode varchar(255)not null,
        longUrl varchar(255)not null,
        shortUrl varchar(255)not null,
        repeated int
    )`
    
    db.query(createTableUrls, (err,result,fields) => {
        if(err) {
            console.log(err.message);
        } 
    });
    db.end(function(err) {
        if (err) {
          return console.log(err.message);
        }
      });

});

const app = express();
app.use(cors());
app.use(bodyParser.json());

require('./routes')(app)

app.listen('8081', ()=>{
    console.log('Server Online');
})

