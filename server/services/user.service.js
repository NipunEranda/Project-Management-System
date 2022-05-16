const helper = require('../util/helper');
const config = require('../util/config');
const e = require('express');
const jwt = require('jsonwebtoken');

async function loginUser(req, res) {
    try {
        var result = await config.executeQuery('SELECT * FROM usr_User where email = "' + req.body.email + '"');
        const password = req.body.password;
        if (result.data.rows.length > 0) {
            const hash = result.data.rows[0].password;
            const response = await helper.comparePassword(password, hash, result);
            return response;
        } else {
            return helper.createResponse(400, null, "Credentials doesn't exist");
        }
    } catch (err) {
        return helper.createResponse(500, null, err.message);
    }
}

async function registerUser(req, res) {
    try {
        let encryptedPassword = await bcrypt.hash(req.body.password, 10);
        return encryptedPassword;
    } catch (err) {
        return err.message;
    }
}

async function removeUser(id, res) {
    
}

async function updateUser(req, res) {

}

async function changeUserPassword(req, res) {
    
}

async function forgotUserPassword(req, res) {

}

async function getUserDetails(id, res) {
    
}

module.exports = {
    loginUser,
    registerUser,
    removeUser,
    updateUser,
    changeUserPassword,
    forgotUserPassword,
    getUserDetails
}