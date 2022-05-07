const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./util/config');
const user = require('./routes/user');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const API_PREFIX = '/api/v1';

//Register /user route
app.use(`${API_PREFIX}/user`, user);

//Initialization error handle
app.use((err, res) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ 'message': err.message });
    return;
});

//export the app
module.exports = app;