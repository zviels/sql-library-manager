const express = require('express');
const { Book } = require('../models');

// Variables

const router = express.Router();

// Routes

router.get('/', (req, res, next) => {

    // const books = await Book.findAll();
    // res.json(books);
    
    // const error = new Error('Muhahaha!');
    // next(error);

});

// Export Routes

module.exports = router;