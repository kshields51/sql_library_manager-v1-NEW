var express = require('express');
var router = express.Router();
var Book = require("../models").Book; //loads in the article model and its ORM methods

/* GET users listing. */
router.get('/', (req, res, next) => {
  Book.findAll()
    .then(books => {
      res.render('index', {
        books
      })
    })
    .catch(err => console.log(err))
  });

router.get('/new', (req, res, next) => {
  res.render('new-book')
})

router.post('/new', (req, res, next) => {
  Book.create(req.body).then(() => {
    res.redirect("/")
  })

})

module.exports = router;
