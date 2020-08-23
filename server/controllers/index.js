const express = require('express');
var db = require('../db');

//Redirect from small url to the original when passed
module.exports = {
    redirectUrl(req, res) {
        (async () => {
            try {
                const url = "select * from urls where urlCode='" + req.params.code + "'";
                db.query(url, function (err, result) {
                    if (err) throw err;

                    if (result.length > 0) {

                        return res.redirect(result[0].longUrl);

                    } else {
                        return res.status(404).json('No url found');
                    }
                });

            } catch (err) {
                console.log(err);
                res.status(500).json('Server error');
            }

        })();
    }
};