const express = require('express');
const { Book } = require('../models');

// Variables

const router = express.Router();

// Routes

router.get('/', async (req, res, next) => {

    // I Must Put Those Async Operations In Try & Catch Block.
    
    const title = 'Home';
    const headline = 'Books';

    const books = await Book.findAll();
    
    res.render('index.pug', { title, headline, books });
    
});

router.get('/:id', async (req, res, next) => {

    const title = 'Book Details';
    const headline = 'Update Book';

    const { id } = req.params;
    const book = await Book.findByPk(+ id);

    if (!(book))
        return next();

    res.render('update-book.pug', { title, headline, book });

});

// Export Routes

module.exports = router;