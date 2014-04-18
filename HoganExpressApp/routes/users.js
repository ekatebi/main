var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a users resource');
});

/* GET users listing. */
router.get('/1', function(req, res) {
    res.send('respond with a users resource 1');
});

module.exports = router;
