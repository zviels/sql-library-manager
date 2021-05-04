const express = require('express');
const { sequelize } = require('./models');

// Variables

const app = express();

// Test DB Connection

async function testDB() {

    try {

        await sequelize.authenticate();
        await sequelize.sync();

        console.log('Connected Successfuly!');

    } catch (error) {

        console.log('Connection Failed.');

    }

}

// Routes

app.get('/', (req, res) => {

    testDB();
    res.send('Hello!');

});

// Start The Server

app.listen(3000, () => console.log('App Is Listening To Port 3000..'));