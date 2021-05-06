const express = require('express');
const { Op } = require('sequelize');

const { Book } = require('../models');
const { handleAsyncOperation } = require('../errorHandlers');

// Variables

const router = express.Router();

// Routes

router.get('/', (req, res) => res.redirect('/books'));

router.get('/search', handleAsyncOperation (async (req, res, next) => {

    const { q, page } = req.query;

    if (!(page))
        return res.redirect('?q=' + q + '&page=1');

    const limit = 5;
    const offset = limit * ((+ page) - 1);
    
    const query = await Book.findAndCountAll({ 

        where: {

            [Op.or]: [

                { title: { [Op.like]: '%' + q + '%' } },
                { author: { [Op.like]: '%' + q + '%' } },
                { genre: { [Op.like]: '%' + q + '%' } },
                { year: { [Op.like]: '%' + q + '%' } }

            ]

        },

        order: [['year', 'DESC']],
        offset,
        limit        

    });

    const numOfPages = Math.ceil(query.count / limit);
    const books = query.rows;

    if ((+ page) > numOfPages)
        return next();

    res.render('index', { title: 'Search Results', page, numOfPages, books, q });

}));

// Export Routes

module.exports = router;