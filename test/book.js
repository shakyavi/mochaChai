let mongoose = require("mongoose");
let Book = require('../models/book');

let chai = require('chai');
//chai.config.includeStack = true;
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('Books Api', () => {
    /*beforeEach((done) => {
        Book.deleteMany({}, (err) => {
            done();
        });
    });*/
    describe('#1 /GET book', () => {
        it('it should GET all the books', (done) => {
            chai.request(server)
                .get('/bookStores/book')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    // res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    /*
    * Test the /POST route
    */
    describe('#2 /POST book', () => {
        it('@1 it should not POST a book without pages field', (done) => {
            let book = {
                title: "The Lord of the Rings",
                author: "J.R.R. Tolkien",
                year: 1954
            }
            chai.request(server)
                .post('/bookStore/book')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('pages');
                    res.body.errors.pages.should.have.property('kind').eql('required');
                    done();
                });
        });

        it('@2 it should POST a book ', (done) => {
            let book = {
                title: "The Lord of the Rings",
                author: "J.R.R. Tolkien",
                year: 1954,
                pages: 1170
            }
            chai.request(server)
                .post('/bookStore/book')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book successfully added!');
                    res.body.book.should.have.property('title');
                    res.body.book.should.have.property('author');
                    res.body.book.should.have.property('pages');
                    res.body.book.should.have.property('year');
                    done();
                });
        });

    });

    /*
  * Test the /GET/:id route
  */
    describe('#3 /GET/:id book', () => {
        it('@1 it should GET a book by the given id', (done) => {
            let book = new Book({title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170});
            book.save((err, book) => {
                chai.request(server)
                    .get('/bookStore/book/' + book.id)
                    .send(book)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title');
                        res.body.should.have.property('author');
                        res.body.should.have.property('pages');
                        res.body.should.have.property('year');
                        res.body.should.have.property('_id').eql(book.id);
                        done();
                    });
            });
        });

    });

    describe('#4 /PUT/:id book', () => {
        it('it should UPDATE a book given the id', (done) => {
            let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
            book.save((err, book) => {
                chai.request(server)
                    .put('/bookStore/book/' + book.id)
                    .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Book updated!');
                        res.body.book.should.have.property('year').eql(1950);
                        done();
                    });
            });
        });
    });
    /*
     * Test the /DELETE/:id route
     */
    describe('#5 /DELETE/:id book', () => {
        it('it should DELETE a book given the id', (done) => {
            let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
            book.save((err, book) => {
                chai.request(server)
                    .delete('/bookStore/book/' + book.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Book successfully deleted!');
                        res.body.result.should.have.property('ok').eql(1);
                        res.body.result.should.have.property('n').eql(1);
                        done();
                    });
            });
        });
    });
    /**
     * Test the calculate assets
     */
    describe('#6 Calculate total book assets', ()=>{
        it('@1 it should return total book asset', (done)=>{
            chai.request(server)
                .get('/bookStore/totalAsset')
                .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('totalAsset');
                done();
            });
        })
    });
});
