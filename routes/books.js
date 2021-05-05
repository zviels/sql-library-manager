const express = require('express');
const { Book } = require('../models');
const { handleAsyncOperation } = require('../errorHandlers');

// Variables

const router = express.Router();

// Routes

router.get('/', handleAsyncOperation (async (req, res, next) => {
    
    const title = 'Home';
    const books = await Book.findAll({ order: [['year', 'DESC']] });
    
    res.render('index.pug', { title, books });
    
}));

// GET Route For Creating A New Book

router.get('/new', (req, res, next) => {

    const title = 'New Book';
    res.render('new-book', { title });

});

// POST Route For Inserting A Newly Created Book

router.post('/new', handleAsyncOperation (async (req, res, next) => {

    const book = req.body;
    await Book.create(book);
    res.redirect('/');

}));

// GET Route For Reviewing A Book

router.get('/:id', handleAsyncOperation (async (req, res, next) => {

    const title = 'Book Details';
    const { id } = req.params;

    const book = await Book.findByPk(+ id);

    if (!(book))
        return next();

    res.render('update-book.pug', { title, book });

}));

// POST Route For Updating A Book

router.post('/:id', handleAsyncOperation (async (req, res, next) => {

    const { id } = req.params;
    const { title, author, genre, year } = req.body;

    await Book.update({ title, author, genre, year }, { where: { id: + id } });
    res.redirect('/');

}));

// POST Route For Deleting A Book

router.post('/:id/delete', handleAsyncOperation (async (req, res, next) => {

    const { id } = req.params;
    const book = await Book.findByPk(+ id);

    await Book.destroy({ where: { id: + id} });
    res.redirect('/');

}));

// Export Routes

module.exports = router;