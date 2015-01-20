var express = require('express');
var router = express.Router();
//var db = require('monk')('localhost/test');
var db = require('monk')('localhost/myapp');

/* GET users listing. */
router.get('/', function(req, res) {

    console.log('get users:');

    var users = db.get('users');

    users.find({}, function (err, docs)
    {
        if (err) throw err;
//        console.log(docs);
        res.send(docs);
    });
});

router.get('/:id', function(req, res) {

    var id = req.params.id;

    console.log('get user: ' + id);

    var users = db.get('users');

    users.find({_id: id}, function (err, docs)
    {
        if (err) throw err;
        console.log(docs);
        res.send(docs);
    });
});

router.post('/:id', function(req, res) {

    var id = req.params.id
    console.log('users post: ' + id);
    console.log(req.body);

    var users = db.get('users');

    users.findAndModify({_id: id}, req.body, function (err, doc) {
        if (err) throw err;
        console.log(doc);
        var msg = 'user post';
        res.send( {msg: msg});
    });

});

router.put('/', function(req, res) {

    console.log('users put');
    console.log(req.body);

    var users = db.get('users');

    users.insert(req.body, function (err, doc) {
        if (err) throw err;
        console.log(doc);
        var msg = 'user put';
        res.send( {msg: msg});
    });

});

router.delete('/:id', function(req, res) {

    var id = req.params.id;

    console.log('users delete: ' + id);

    var users = db.get('users');

    if (id == 'null')
    {
        id = '';
    }

    users.remove({_id: id}, function (err, doc) {
        if (err) throw err;
        var msg = 'user del: ' + id;
        res.send( {msg: msg});
        console.log('sent: ' + msg);
    });

});

module.exports = router;
