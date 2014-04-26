var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/test');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('get: respond with a profile resource');
});

router.post('/', function(req, res) {

    console.log(req.body);

    var users = db.get('users');

    users.insert(req.body, function (err, doc) {
        if (err) throw err;
    });

    res.send('post: respond with a profile resource');
});

router.put('/', function(req, res) {

    console.log(req.body);

    var users = db.get('users');

    users.insert(req.body, function (err, doc) {
        if (err) throw err;
    });

    res.send('post: respond with a profile resource');
});

router.delete('/', function(req, res) {

    console.log(req.body);

    var users = db.get('users');

    users.insert(req.body, function (err, doc) {
        if (err) throw err;
    });

    res.send('post: respond with a profile resource');
});


router.get('/1', function(req, res) {
    res.send('respond with a profile resource 1');
});

module.exports = router;
