var express = require('express');
var router = express.Router();
var Book = require("../models").Book; //loads in the article model and its ORM methods

/* GET books listing. */
router.get('/', (req, res, next) => {
  Book.findAll()
    .then(books => {
      res.render('index', {
        books
      })
    })
    .catch((err) => {
      res.send(500)
    });
  });

// render the new book form
router.get('/new', (req, res, next) => {
  res.render('new-book')
})


router.post('/new', (req, res, next) => {
  Book.create(req.body).then(() => {
    res.redirect("/")
  })
  .catch((err) => {
    res.send(500)
  });

})

router.get('/:id', (req, res, next) => {
  Book.findById(req.params.id).then(function(book) {
    res.render('update-book', {book: book, id: req.params.id})
  })
})

//edit book
router.post('/:id', (req, res, next) => {
  Book.findById(req.params.id).then(function(book) {
    return book.update(req.body);
}).then(() => res.redirect('/'))
.catch((err) => {
  res.send(500)
});
});

router.post('/:id/delete', (req, res, next) => {
  Book.findById(req.params.id).then(function(book) {
    return book.destroy();
  }).then(()=> {
    res.redirect('/')
  })
  .catch((err) => {
    res.send(500)
  });
});

module.exports = router;
