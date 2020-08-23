const validUrl = require('valid-url');
const shortid = require('shortid');
var db = require('../db');
var settings = require('../settings.json');

//Get input from vue and populate the db

module.exports = {
    processUrls(req, res) {
        (async () => {
            const longUrl = req.body.longUrl;
            // generate a random short id
            const urlCode = shortid.generate();

            if (validUrl.isUri(longUrl)) {
                try {
                    db.query("select * from urls where longUrl= '" + longUrl + "'", function (err, result) {
                        if (err) throw err;

                        if (result.length > 0) {
                            //check if url already exists
                            db.query("update urls set repeated = repeated + 1 where longUrl='" + longUrl + "'  ");
                            console.log("1 record updated");

                            //get the short url if it already existes in the db
                            const shortRepUrl = "select shortUrl from urls where longUrl='" + longUrl + "'";
                            db.query(shortRepUrl, function (err, result) {
                                if (err) throw err;
                                res.send(result[0].shortUrl);
                            });

                        } else {
                            //Domain is optional and can be changed
                            const shortUrl = (settings.Urls.baseUrl + '/' + urlCode);

                            db.query("INSERT INTO urls (longUrl,shortUrl,urlCode) VALUES ('" + longUrl + "' ,'" + shortUrl + "','" + urlCode + "' )", function (err, result) {
                                if (err) throw err;
                                console.log("1 record inserted");
                            });

                            res.json(shortUrl);
                        }

                    });

                } catch (err) {
                    console.error(err);
                    res.status(500).json('Server error');
                }

            } else {
                res.status(401).json('Invalid long url');
            }
        })();
    }
};