var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
const router = express.Router();



/*// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/

/*// mustache模板
var mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress(path.join(__dirname, 'views'), '.html'));
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));*/

const ejs = require('ejs')
app.set('views', path.join(__dirname , 'views'))
app.engine('.html', ejs.__express)
app.set('view engine', 'html')


var staticPath = path.join(__dirname, 'public')
app.use('/static', express.static(staticPath));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('keyboard cat'));




// const session = require('express-session');
// const RedisStore = require('connect-redis')(session);
// var options = {
//     "host": "127.0.0.1",
//     "port": "6379",
//     "ttl": 60 * 60 * 24 * 30,   //Session的有效期为30天
// };
/*app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized:true,
    cookie: {secure: false},
    name: 'sessionid'
}));*/
// app.use(session({
//     store: new RedisStore(options),
//     secret: 'keyboard cat'
// }))

// 登录拦截
app.use('/users', function (req, res, next) {
    var url = req.originalUrl;
    if (url != "/login" && !req.session.user) {
      return res.redirect("/login");
    }
    next();
});

app.use('/', index);
app.use('/users', users);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  console.log(err.message)
  res.render('error', {err: err});
});

module.exports = app;
