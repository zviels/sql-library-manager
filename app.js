const express = require('express');
const { sequelize } = require('./models');

const mainRoutes = require('./routes');
const bookRoutes = require('./routes/books');
const { handlePageNotFoundError, handleGlobalError } = require('./errorHandlers');

// Variables

const app = express();

// Set Up View Engine

app.set('view engine', 'pug');

// Set Up Static Server

app.use('/static', express.static('public'));

// Routes

app.use(mainRoutes);
app.use('/books', bookRoutes);

// Error Handlers

app.use(handlePageNotFoundError);
app.use(handleGlobalError);

// Start The Server

app.listen(3000, () => console.log('App Is Listening To Port 3000..'));