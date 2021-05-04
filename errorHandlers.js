// Async Operation Handler

const handleAsyncOperation = (callback) => {

    return async (req, res, next) => {

        try {

            callback(req, res, next);

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

// Global Error Handler

const handleGlobalError = (error, req, res, next) => {

    error.message = error.message || 'An Error Occurred!';
    
    error.status = error.status || 500;
    error.description = 'Oops! It Looks Like The Server Encountered An Error!';

    res.status(error.status).render('error', { error, headline: error.message });

}

// Export Error Handlers

module.exports = { handleAsyncOperation, handlePageNotFoundError, handleGlobalError };