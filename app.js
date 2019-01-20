var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');

/*********** /
express object is created
************/
var app = express();


/*********** /
Sets the view engine to pug
************/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))

/*********** /
Routers are defined here in order to break up the program into smaller chuncks
************/
app.use('/', indexRouter);
app.use('/books', booksRouter);


/*********** /
This catches any 404 error and sends it to the error handling middleware Note: this was created when using express-generator and has been modified to fit my program 
************/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/*********** /
Error handling middleware
************/
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('page-not-found-error');
});

module.exports = app;
