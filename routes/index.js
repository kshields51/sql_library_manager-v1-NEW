var express = require('express');
var router = express.Router();

/*********** /
Home route that redirects to the books route
************/
router.get('/', function(req, res, next) {
  res.redirect('/books');
});

module.exports = router;
