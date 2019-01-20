var express = require('express');
var router = express.Router();
var Book = require("../models").Book; //loads in the article model and its ORM methods

/*********** /
GET books listing. This finds all the books and then renders the index route to the page
************/
router.get('/', (req, res, next) => {
  Book.findAll() //finaAll returns all books from the data base which are then passed into the index view and are iterated though and displayed on the screen.
    .then(books => {
      res.render('index', {
        books
      })
    })
    .catch((err) => {
      res.send(500)
    });
  });


/*********** /
// render the new book form.
************/
router.get('/new', (req, res, next) => {
  res.render('new-book', {book: {}})
});


/*********** /
 Creates a new book within the Database. Uses req.body to create a new book within the database.
************/
router.post('/new', (req, res, next) => {
  Book.create(req.body).then(() => { 
    res.redirect("/")
  })
  .catch((err) => {
    if(err.name === "SequelizeValidationError") { // Validation here checks to make sure that the author and the title fields are present.
      res.render('new-book', {
        book: Book.build(req.body),
        errors: err.errors
      });
    } else {
      throw err;
    }
  })
  .catch((err) => {
    res.send(500)
  });

});


/*********** /
 Renders the Update Book Form . If the user searches for an id that does not exist, an error object is created and handled by error middleware below.
************/
router.get('/:id', (req, res, next) => {
  Book.findById(req.params.id).then(function(book) {
    if (!book) {
      const bookErr = new Error("There has been an error")
      bookErr.code = 2 //sets a custom error code of 2 so that the correct template can be rendered
      next(bookErr)
    } else {
      res.render('update-book', {book: book, id: req.params.id}) //book is matched to the forms value attributes
    }
  })
});


/*********** /
 Edits a book entry in the database. 
************/
router.post('/:id', (req, res, next) => {
  Book.findById(req.params.id).then(function(book) {
    return book.update(req.body); //the db is updated and then the user is redirected to the homepage 
}).then(() => res.redirect('/'))
.catch((err) => {
  if(err.name === "SequelizeValidationError") {// if a user does not include an author and a title
    var book = Book.build(req.body); // created so that the form is repopulated
    book.id = req.params.id 
    res.render('update-book', { //re-renders the update-book view to the page
      book: book,
      errors: err.errors
    });
  } else {
    throw err; //if there is an error outside a validation error it will be thown
  }
})
  .catch((err) => {
  res.send(err)
});
});


/*********** /
 Deletes a book from the database
************/
router.post('/:id/delete', (req, res, next) => {
  Book.findById(req.params.id).then(function(book) {
    return book.destroy(); //destroy deletes the book from the database
  }).then(()=> {
    res.redirect('/')
  })
  .catch((err) => {
    res.send(500)
  });
});



module.exports = router;
