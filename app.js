var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var chapter = require('./routes/chapter');
var myClass = require('./routes/myClass');
var students = require('./routes/students');
var test = require('./routes/test');
var viewnovel = require('./routes/viewnovel');
var viewsection = require('./routes/viewsection');
var AllNovels = require('./routes/AllNovels');

//app模块
var appindex = require('./routes/appindex');
var appviewnove = require('./routes/appviewnove');
//var novelAuto = require('./lib/novelAuto');
//novelAuto.getAllNovel();

//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/myClass',myClass);
app.use('/ajax/students',students);
app.use('/test',test);
app.use('/chapter',chapter);
app.use('/viewnovel',viewnovel);
app.use('/viewsection',viewsection);
app.use('/AllNovels',AllNovels);

//app模块
app.use('/app/',appindex);
app.use('/app/appviewnove',appviewnove);
//app.use('/users', users);

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
  res.render('error');
});

module.exports = app;
