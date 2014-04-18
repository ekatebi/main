var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('get: respond with a profile resource');
});

router.post('/', function(req, res) {
    console.log(req.body);
    res.send('post: respond with a profile resource');
});

router.get('/1', function(req, res) {
    res.send('respond with a profile resource 1');
});

module.exports = router;
