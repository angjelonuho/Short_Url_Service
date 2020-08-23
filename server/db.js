var mysql = require('mysql');
var settings = require('./settings.json');
var db;

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(settings.dbConnecton);

	//#### Optional code creating db table
        //#### not recomended in real-time applications
        //#### used for convinience
        let createTableUrls = `create table if not exists urls(
            id int primary key auto_increment,
            urlCode varchar(255)not null,
            longUrl varchar(255)not null,
            shortUrl varchar(255)not null,
            repeated int null default '0'
        )`
        
        db.query(createTableUrls, (err,result,fields) => {
            if(err) {
                console.log(err.message);
            } 
        });

        db.connect(function(err){
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
            }
        });
    }
    return db;
}

module.exports = connectDatabase();