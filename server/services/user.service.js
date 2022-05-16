const helper = require('../util/helper');
const config = require('../util/config');
const bcrypt = require('bcryptjs');
const mail = require('../util/mail');
require('dotenv').config();

async function loginUser(req, res) {
    let result = null;
    try {
        result = await config.executeQuery(`SELECT * FROM usr_User where email = "${req.body.email}" AND isDelete = 0`);
        const password = req.body.password;
        if (result.data.rows.length > 0) {
            const hash = result.data.rows[0].password;
            const response = await helper.comparePassword(password, hash, result);
            return response;
        } else {
            return helper.createResponse(400, null, "Credentials doesn't exist.");
        }
    } catch (err) {
        return helper.createResponse(500, null, err.message);
    }
}

async function registerUser(req, res) {
    let result = null;
    try {
        result = await config.executeQuery(`SELECT * FROM usr_User WHERE email = "${req.body.email}"`);
        if (!(result.data.rows.length > 0)) {
            let encryptedPassword = await bcrypt.hash(req.body.password, 10);
            result = await config.executeQuery(`INSERT INTO usr_User VALUES(0, ${req.body.firstName ? `"${req.body.firstName}"` : null}, ${req.body.lastName ? `"${req.body.lastName}"` : null}, ${req.body.email ? `"${req.body.email}"` : null}, "${encryptedPassword}", 2, 1, 0, "${helper.getCurrentDateTime()}", null)`);
            if (result.data.rows.insertId > 0) {
                return helper.createResponse(200, result.success, null);
            } else {
                return helper.createResponse(400, null, result.data.err.sqlMessage);
            }
        } else {
            return helper.createResponse(400, null, "Account already exists.");
        }
    } catch (err) {
        return helper.createResponse(500, null, err.message);
    }
}

async function removeUser(id, res) {
    let result = null;
    try {
        result = await config.executeQuery(`UPDATE usr_User SET isActive = 0, isDelete = 1, deletedAt = "${helper.getCurrentDateTime()}" WHERE id = ${id}`);
        if (result.success)
            return helper.createResponse(200, result.success, null);
        else
            return helper.createResponse(200, result.success, result.data.err.sqlMessage);
    } catch (err) {
        return helper.createResponse(500, null, err.message);
    }
}

async function updateUser(req, res) {
    let result = null;
    try {
        result = await config.executeQuery(`UPDATE usr_User SET first_name = "${req.body.firstName}", last_name = "${req.body.lastName}" WHERE id = ${req.params.id}`);
        if (result.success)
            return helper.createResponse(200, result.success, null);
        else
            return helper.createResponse(200, result.success, result.data.err.sqlMessage);
    } catch (err) {
        return helper.createResponse(500, null, err.message);
    }
}

async function changeUserPassword(req, res) {
    let result = null;
    try {
        let encryptedPassword = await bcrypt.hash(req.body.password, 10);
        result = await config.executeQuery(`UPDATE usr_User SET password = "${encryptedPassword}" WHERE id = ${req.params.id}`);
        if (result.success)
            return helper.createResponse(200, result.success, null);
        else
            return helper.createResponse(200, result.success, result.data.err.sqlMessage);
    } catch (err) {
        return helper.createResponse(500, null, err.message);
    }
}

// async function forgotUserPassword(req, res) {
//     let result = null;
//     try {
//         //Check if the email exists or not
//         result = await config.executeQuery(`SELECT * FROM usr_User where email = "${req.body.email}" AND isDelete = 0`);
//         console.log(result);
//         if (result.data.rows.length > 0) {
//             //Create a new password using code generator
//             const code = helper.generateString(10);
//             console.log(code);
//             encryptedPassword = await bcrypt.hash(code, 10);

//             //Send the generated code via email
//             //mail.sendEmail(req, mail.getEmailTemplate(2, { code: code }).subject, helper.getEmailTemplate(2, { code: code }).body);

//             //Update the password
//             result = await config.executeQuery(`UPDATE usr_User SET password = "${encryptedPassword}" WHERE id = ${result.data.rows[0].id}`);
//             if (result.success)
//                 return helper.createResponse(200, result.success, null);
//             else
//                 return helper.createResponse(200, result.success, result.data.err.sqlMessage);
//         } else {
//             return helper.createResponse(400, null, "Credentials doesn't exist.");
//         }
//     } catch (err) {
//         return helper.createResponse(500, null, err.message);
//     }
// }

async function getUserDetails(id, res) {
    try {
        var result = await config.executeQuery(`SELECT * FROM usr_User WHERE id = ${id} AND isDelete = 0`);
        if (result.data.rows.length > 0) {
            const role = await config.executeQuery(`SELECT * FROM usr_Role where id = ${result.data.rows[0].roleId}`);
            const user = {
                id: result.data.rows[0].id,
                firstName: result.data.rows[0].fname,
                lastName: result.data.rows[0].lname,
                email: result.data.rows[0].email,
                role: role.data.rows[0]
            }
            return helper.createResponse(200, user, null);
        } else {
            return helper.createResponse(200, result.data.rows, null);
        }
    } catch (err) {
        console.log(err);
        return helper.createResponse(500, null, err.message);
    }
}

async function removeOldInactiveAccounts() {
    console.log(`old accounts removed at ${helper.getCurrentDateTime()}`);
}

module.exports = {
    loginUser,
    registerUser,
    removeUser,
    updateUser,
    changeUserPassword,
    //forgotUserPassword,
    getUserDetails,
    removeOldInactiveAccounts
}