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
This catches errors and sends it to the error handling middleware Note: this was created when using express-generator and has been modified to fit my program 
************/
// catch error and forward to error handler
app.use(function(req, res, next) {
  next(createError());
});

/*********** /
Error handling middleware
************/
app.use(function(err, req, res, next) {
  // render the error page
  console.log(err)
  if (err.code === 2) { // if the user tries to locate an article that does not exists
    console.log(err)
    res.render('error')
  } else { // handles page not found errors
    res.render('page-not-found-error');
  }
});

module.exports = app;
