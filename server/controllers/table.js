var db = require('../db');


//Get the short url form database

module.exports = {
    allUrls(req, res) {
        (async () => {
            try {
                db.query("SELECT * FROM urls order by `id` desc", function (err, result, fields) {
                    if(err) throw err;
                    res.send(JSON.stringify(result));
                })
                } catch (err) {
                    console.error(err);
                    res.status(500).json('Server error');
                }
        })();
    }
};