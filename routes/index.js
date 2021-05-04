const express = require('express');

// Variables

const router = express.Router();

// Routes

router.get('/', (req, res) => res.redirect('/books'));

// Export Routes

module.exports = router;