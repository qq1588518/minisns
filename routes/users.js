var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var str = JSON.stringify(req.session);
  res.send(str);
});

router.get('/center', function(req, res, next) {
  res.send('用户中心');
});



module.exports = router;
