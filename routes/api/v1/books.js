const express = require('express');
const router = express.Router();
const {createBook, deleteBook, getBookById, updateBook, getAllBooks } = require('../../../controllers/books');

router.post('/create/book', createBook)

router.delete('/delete/bookByID/:bookId', deleteBook)

router.put('/update/bookByID/:bookId', updateBook)

router.get('/get/bookByID/:bookId', getBookById)

router.get('/get/all-books/', getAllBooks)

module.exports = router;