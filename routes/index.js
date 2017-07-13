var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
   res.send('Please use:  /api/  to gain access to your tracked activities. ')
});

module.exports = router;
