const router = require('express-promise-router')()
const bookController = require('../controllers/booksController')

router.route("/book")
    .get(bookController.getBooks)
    .post(bookController.postBook);
router.route("/book/:id")
    .get(bookController.getBook)
    .delete(bookController.deleteBook)
    .put(bookController.updateBook);
router.route("/totalAsset").get(bookController.calculateBooksAsset);
module.exports = router;
