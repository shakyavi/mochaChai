let bookModel = require('../models/book');

module.exports = {

    /*
     * GET /book route to retrieve all the books.
     */
    getBooks:(req, res) => {
        //Query the DB and if no errors, send all the books
        let query = bookModel.findBook({});
        query.exec((err, books) => {
            if (err) res.send(err);
            //If no errors, send them back to the client
            res.json(books);
        });
    },

    /*
     * POST /book to save a new book.
     */
    postBook(req, res) {
        //Creates a new book
        var newBook = new bookModel(req.body);
        //Save it into the DB.
        newBook.save((err, book) => {
            if (err) {
                res.send(err);
            } else { //If no errors, send it back to the client
                res.json({message: "Book successfully added!", book});
            }
        });
    },

    /*
     * GET /book/:id route to retrieve a book given its id.
     */
    getBook(req, res) {
        bookModel.findById(req.params.id, (err, book) => {
            if (err) res.send(err);
            //If no errors, send it back to the client
            res.json(book);
        });
    },

    /*
     * DELETE /book/:id to delete a book given its id.
     */
    deleteBook(req, res) {
        bookModel.remove({_id: req.params.id}, (err, result) => {
            res.json({message: "Book successfully deleted!", result});
        });
    },

    /*
     * PUT /book/:id to updatea a book given its id
     */
    updateBook(req, res) {
        bookModel.findById({_id: req.params.id}, (err, book) => {
            if (err) res.send(err);
            Object.assign(book, req.body).save((err, book) => {
                if (err) res.send(err);
                res.json({message: 'Book updated!', book});
            });
        });
    },
     calculateBooksAsset : async (req,res)=>{
        let {bookId,qty} = req.body;
        let totalSum = await bookModel.totalAsset();

        res.json({message: 'Success', totalAsset: totalSum[0].totalSum});

    }


};