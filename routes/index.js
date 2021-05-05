const express = require('express');
const { Op } = require('sequelize');

const { Book } = require('../models');
const { handleAsyncOperation } = require('../errorHandlers');

// Variables

const router = express.Router();

// Routes

router.get('/', (req, res) => res.redirect('/books'));

router.get('/search', handleAsyncOperation (async (req, res, next) => {

    const { q } = req.query;
    
    const books = await Book.findAll({ 

        where: {

            [Op.or]: [

                { title: { [Op.like]: '%' + q + '%' } },
                { author: { [Op.like]: '%' + q + '%' } },
                { genre: { [Op.like]: '%' + q + '%' } },
                { year: { [Op.like]: '%' + q + '%' } }

            ]

        }

    });

    res.render('index', { title: 'Search Results', books, q });

}));

// Export Routes

module.exports = router;