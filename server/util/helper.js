const config = require('./config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');

//MYSQL Date
function getCurrentDateTime(){
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

//Function to generate a random string to a given character count
function generateString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

//Function to compare User Passwords
const comparePassword = async function (password, hash, result) {
    try {
        if (await bcrypt.compare(password, hash)) {
            let data = {
                userId: result.data.rows[0].id,
                email: result.data.rows[0].email,
                roleId: result.data.rows[0].roleId
            }
            const response = await new Promise((resolve, reject) => {
                jwt.sign({ user: data }, config.secret, { expiresIn: config.tokenExpireAfter }, (err, token) => {
                    resolve(createResponse(200, { token: token }, null));
                })
            });
            return response;
        } else {
            return createResponse(400, null, "Credentials are invalid.");
        }
    } catch (err) {
        return createResponse(500, null, err.message);
    }
}

//Function to verify the token passed to the server
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        next();
    } else {
        res.status(result.code).json({ data: result.data, error: result.error });
    }
}

//FUnction to verify user and check for access permissions
function verifyUser(req, accessList) {
    const data = jwt.verify(req.token, config.secret);
    if (accessList.includes(data.user.roleId)) {
        return data;
    } else {
        return null;
    }
}

function createResponse(code, data, error) {
    return { code: code, data: data, error: error };
}

//Exports list
module.exports = {
    generateString,
    comparePassword,
    verifyToken,
    verifyUser,
    createResponse,
    getCurrentDateTime
};