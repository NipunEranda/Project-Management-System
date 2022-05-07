const express = require('express');
const helper = require('../util/helper');
const router = express.Router();
const config = require('../util/config');

const userService = require('../services/userService');

router.get('/test', async function(req, res) {
    helper.sendResponse(res, 200, {status: 'hello'}, null);
});

router.post('/login', async function(req, res) {
    userService.loginUser(req, res);
});

router.post('/userRegistration', async function(req, res) {
    userService.registerUser(req, res);
});
router.delete('/deleteUser', helper.verifyToken, async function(req, res) {
    const data = helper.verifyUser(req, config.accessList.all);
    if (data) {
        userService.removeUser(data.user.userId, res);
    } else {
        helper.sendResponse(res, 500, null, "Access Denied");
    }
});

router.put('/updateUser', helper.verifyToken, async function(req, res) {
    const data = helper.verifyUser(req, config.accessList.all);
    if (data) {
        req.body.id = data.user.userId;
        userService.updateUser(req, res);
    } else {
        helper.sendResponse(res, 500, null, "Access Denied");
    }
});

router.put('/changePassword', helper.verifyToken, async function(req, res) {
    const data = helper.verifyUser(req, config.accessList.all);
    if (data) {
        userService.changeUserPassword(req, res);
    } else {
        helper.sendResponse(res, 500, null, "Access Denied");
    }
});

router.put('/forgotPassword', async function(req, res) {
    userService.forgotUserPassword(req, res);
});

router.get('/confirmUser/:data', async function(req, res) {
    userService.confirmUser(req.params.data, res);
});

router.get('/', helper.verifyToken, async function(req, res) {
    const data = helper.verifyUser(req, config.accessList.all);
    if (data) {
        req.body.id = data.user.userId;
        userService.getUserDetails(req.body.id, res);
    } else {
        helper.sendResponse(res, 500, null, "Access Denied");
    }
});

router.get("/accountConfirmed", async function(req, res) {
    res.sendFile(__dirname + '/views/accountConfirmed.html');
});

module.exports = router;