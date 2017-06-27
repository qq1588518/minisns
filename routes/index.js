var express = require('express');
var router = express.Router();


function json (obj) {
  return JSON.stringify(obj)
}

// console.log(session)

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/demo', function(req, res, next) {
  res.render('demo', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  // res.send('login');
  res.render('login')
});
router.get('/register', function (req, res, next) {
  res.render('register')
})
router.post('/register', function (req, res, next) {
  // res.render('msg')
  res.send(JSON.stringify(req.body))
  // res.render('register')
})
router.get('/api', function(req, res, next) {
  // console.log(req.session)
  res.json({
    name: 'xxx',
    version: '1.0'
  })
});

router.get('/session/set', function(req, res, next) {
  req.session.user = {
    name: '测试',
    pwd: '132456',
    info: 'this is a test.'
  }
  var str = JSON.stringify(req.session);
  res.send('set:' + str);
});
router.get('/session/get', function(req, res, next) {

  var str = JSON.stringify(req.session);
  res.send('get:' + str);
});
module.exports = router;
