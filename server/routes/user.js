const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helper = require('../util/helper');
const config = require('../util/config');

const userService = require('../services/user.service');

router.post('/login', async function(req, res) {
    userService.loginUser(req, res).then(result => {
        res.status(result.code).json({ data: result.data, error: result.error });
    }).catch(err => {
        const result = helper.createResponse(500, null, err.message);
        res.status(result.code).json({ data: result.data, error: result.error });
    });
});

router.post('/register', async function(req, res) {
    userService.registerUser(req, res).then(result => {
        res.status(result.code).json({ data: result.data, error: result.error });
    }).catch(err => {
        const result = helper.createResponse(500, null, err.message);
        res.status(result.code).json({ data: result.data, error: result.error });
    });
});

router.delete('/delete/:id', helper.verifyToken, async function(req, res) {
    const data = helper.verifyUser(req, config.accessList.all);
    if (data) {
        const result = await userService.removeUser(req.params.id, res);
        res.status(result.code).json({ data: result.data, error: result.error });
    } else {
        res.status(403).json({ data: "Access Denied", error: null });
    }
});

router.put('/update/:id', helper.verifyToken, async function(req, res) {
    const data = helper.verifyUser(req, config.accessList.all);
    if (data) {
        const result = await userService.updateUser(req, res);
        res.status(result.code).json({ data: result.data, error: result.error });
    } else {
        res.status(403).json({ data: "Access Denied", error: null });
    }
});

router.put('/changePassword/:id', helper.verifyToken, async function(req, res) {
    const data = helper.verifyUser(req, config.accessList.all);
    if (data) {
        const result = await userService.changeUserPassword(req, res);
        res.status(result.code).json({ data: result.data, error: result.error });
    } else {
        res.status(403).json({ data: "Access Denied", error: null });

    }
});

// router.put('/forgotPassword', async function(req, res) {
//     const result = await userService.forgotUserPassword(req, res);
//     res.status(result.code).json({ data: result.data, error: result.error });
// });

router.get('/:id', helper.verifyToken, async function(req, res) {
    const data = helper.verifyUser(req, config.accessList.all);
    if (data) {
        const result = await userService.getUserDetails(req.params.id, res);
        res.status(result.code).json({ data: result.data, error: result.error });
    } else {
        res.status(403).json({ data: "Access Denied", error: null });

    }
});

module.exports = router;