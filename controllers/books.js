const books  = require('../models/bookSchema')
const { ObjectId } = require('mongodb');
const config = require('config');
exports.createBook = async (req, res) => {
    try {
        let obj = req.body
        if(!obj){
            return res.status(400)
        }
        let book = new books(obj)
        await book.save();
        res.status(200).json({ message: "Book successfully created", BookData: book })
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send({ "message": 'Server error' });
    }
}
exports.deleteBook = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.bookId)) {
            return res.status(400).json({ message: 'Invalid bookId' });
        }
        const book = await books.findById(req.params.bookId)

        if (!book) {
            return res.status(400).json({ message: "Book does not exist" })
        }
        await books.deleteOne({ _id: req.params.bookId });
        res.status(200).json({ message: "Book deleted" })
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ "message": 'Server error' });
    }
}
exports.getBookById = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.bookId)) {
            return res.status(400).json({ message: 'Invalid bookId' });
        }
        const book = await books.findById(req.params.bookId)

        if (!book) {
            return res.status(400).json({ message: "Book does not exist" })
        }
        res.status(200).json({ BookData: book })
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ "message": 'Server error' });
    }
}
exports.updateBook = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.bookId)) {
            return res.status(400).json({ message: 'Invalid bookId' });
        }
        let book = await books.findById(req.params.bookId)

        if (!book) {
            return res.status(400).json({ message: "Book does not exist" })
        }
        let updateObj = req.body
        if(updateObj.title){
            book.title = updateObj.title
        }
        if(updateObj.author){
            book.author = updateObj.author
        }
        if(updateObj.summary){
            book.summary = updateObj.summary
        }
        if(updateObj.genre){
            book.genre = updateObj.genre
        }
        if(updateObj.ageGroup){
            book.ageGroup = updateObj.ageGroup
        }
        await book.save();
        res.status(200).json({ BookData: book })
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ "message": 'Server error' });
    }
}
exports.getAllBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        if(page < 1 || limit < 1 ){
            return res.status(500).send({"message": 'Invalid page number or limit'});
        }

        let bookList = await books.find().limit(limit).skip((page - 1)* limit).exec();
        let count = await books.count();

        res.json({ BookList: bookList, totalPages : Math.ceil(count/limit), currentPage: page, totalCount: count})
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ "message": "Server Error" });
    }
}


