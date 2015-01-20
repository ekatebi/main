var express = require('express');
var router = express.Router();
//var mongo = require('mongodb');
//var monk = require('monk');
//var db =  monk('localhost:27017/test');

var db = require('monk')('localhost/test');

/* GET home page. */
router.get('/', function(req, res) {

    db.driver.admin.listDatabases(function(e,dbs){

        console.log(dbs);

       // res.json(dbs);
    });

  res.render('index', { title: 'Express' });
});

module.exports = router;
