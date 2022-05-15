const express = require('express');
//const user = require('./routes/user');
const cors = require('cors');
const app = express();
const config = require('./utils/config');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());

//Register /user route
//app.use('/user', user)
app.use('/', (req, res) => res.json({test: 'test'}))

//Initialization error handle
app.use((err, res) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });
    return;
});

//Create Server
app.listen(config.hostPORT, (err) => {
    if (err) throw err
    console.log('Server running in http://' + config.hostIP + ':' + config.hostPORT);
});