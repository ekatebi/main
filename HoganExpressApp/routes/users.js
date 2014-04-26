var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/test');

/* GET users listing. */
router.get('/', function(req, res) {

    console.log('get users:');

    var users = db.get('users');

    users.find({}, function (err, docs)
    {
        var users = { users: docs }

        console.log(users);

        res.send(users);
    });

//    res.send('respond with a users resource');
});

router.post('/:id', function(req, res) {

    console.log('users post: ' + req.params.id);
    console.log(req.body);

    var users = db.get('users');

    users.findAndModify(req.params.id, req.body, function (err, doc) {
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

    res.send('put: respond with user resource');
});

router.delete('/:id', function(req, res) {

    var id = req.params.id;

    console.log('users delete: ' + id);

    var users = db.get('users');

    users.remove(id, function (err, doc) {
        if (err) throw err;
    });

    var msg = 'user del: ' + id;

    res.send( {msg: msg});

    console.log('sent: ' + msg);
});

module.exports = router;
