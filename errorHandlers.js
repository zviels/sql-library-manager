const { Book } = require('./models');

// Async Operation Handler

const handleAsyncOperation = (callback) => {

    return async (req, res, next) => {

        try {

            await callback(req, res, next);

        } catch (error) {

            next(error);

        }

    }

}

// 404 Handler

const handlePageNotFoundError = (req, res, next) => {

    const error = new Error('Page Not Found!');

    error.status = 404;
    error.description = 'Oops! The Page You Are Looking For Does Not Exist!';

    res.status(404).render('page-not-found', { error, headline: error.message });

}

// Sequelize Error Handler

const handleSequelizeValidationError = async (error, req, res, next) => {

    const { name } = error;
    const { errors } = error;
    const url = req.originalUrl;

    if (name === 'SequelizeValidationError') {

        if (url.includes('/books/new')) {

            // Display Validation Errors When Creating A New Book

            const book = await Book.build(req.body);
            res.render('new-book', { title: 'New Book', headline: 'Add New Book', book, errors });

        }

        else {

            // Display Validation Errors When Updating A Book
    
            const book = await Book.build(req.body);
    
            // For Some Reason, Book ID Becomes 'Null' When It Reaches The Error Handler, And No Parameters Are Defined.
            // The Following Line Makes Sure The App Won't Break.
    
            book.id = + url.match(/\d+/)[0];
            res.render('update-book', { title: 'Book Details', headline: 'Update Book', book, errors });

        }

    }

    else
        next(error);

}

// Global Error Handler

const handleGlobalError = (error, req, res, next) => {

    error.message = error.message || 'An Error Occurred!';
    
    error.status = error.status || 500;
    error.description = 'Oops! It Looks Like The Server Encountered An Error!';

    res.status(error.status).render('error', { error, headline: error.message });

}

// Export Error Handlers

module.exports = { handleAsyncOperation, handleSequelizeValidationError, handlePageNotFoundError, handleGlobalError };