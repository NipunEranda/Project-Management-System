const config = require('./config');
const jwt = require('jsonwebtoken');

//Check for empty values in a jsonObject
function isJsonKeyValueEmpty(object, exceptions) {
    let output = null;
    Object.keys(object).forEach(element => {
        if (exceptions.length > 0) {
            if (exceptions.includes(element)) {
                
            }else{
                if (object[element] === null || object[element] === "") {
                    console.log(element + " cannot be null or empty");
                    output = element + " cannot be null or empty";
                }
            }
        }else{
            if (object[element] === null || object[element] === "") {
                console.log(element + " cannot be null or empty");
                output = element + " cannot be null or empty";
            }
        }
    });
    return output;
}


//Function to send the response
function sendResponse(res, status, data_value, err_value) {
    res.status(status);
    res.json({ data: data_value, error: err_value });
}

//Function to process MYSQL Procedure outputs
function processProcedureOutput(res, result, err_output) {
    if (result.data.rows.length < 3) {
        if (result.data.rows[1][0].output == 1) {
            return returnProcedureOutputData("success", 200, null);
        } else {
            return returnProcedureOutputData("fail", 201, err_output);
        }
    } else {
        return returnProcedureOutputData("fail", 201, result.data.rows[0][0].message);
    }
}

//Function to structure procedure outputs
function returnProcedureOutputData(data, code, error) {
    return {
        "data": data,
        "code": code,
        "error": error
    };
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
const comparePassword = async(password, hash) => {
    try {
        if (await bcrypt.compare(password, hash)) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err.getMessage);
    }
}

//Function to verify the token passed to the server
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(req.headers);
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        sendResponse(res, 403, null, "Access Denied");
    }
}

//FUnction to verify user and check for access permissions
function verifyUser(req, accessList) {
    const data = jwt.verify(req.token, config.crypt.secret);
    if (accessList.includes(data.user.roleId)) {
        return data;
    } else {
        return null;
    }
}

//Exports list
module.exports = {
    sendResponse,
    generateString,
    comparePassword,
    processProcedureOutput,
    verifyToken,
    verifyUser,
}