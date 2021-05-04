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

// Export Routes

module.exports = router;