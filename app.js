const express = require('express');

// Variables

const app = express();

// Routes

app.get('/', (req, res) => {

    res.send('Hello!');

});

// Start The Server

app.listen(3000, () => console.log('App Is Listening To Port 3000..'));