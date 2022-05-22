const express = require('express');
const router = express.Router();
const helper = require('../util/helper');
const config = require('../util/config');

const projectService = require('../services/project.service');

router.get('/', helper.verifyToken, async function (req, res) {
    try {
        const data = helper.verifyUser(req, config.accessList.all);
        if (data) {
            projectService.getAllProjects(req, res).then(result => {
                res.status(result.code).json({ data: result.data, error: result.error });
            }).catch(err => {
                const result = helper.createResponse(500, null, err.message);
                res.status(result.code).json({ data: result.data, error: result.error });
            });
        } else {
            res.status(403).json({ data: "Access Denied", error: null });
        }
    } catch (e) {
        if (e.expiredAt)
            res.status(401).json({ data: null, error: "Unauthorized access" });
        else {
            res.status(500).json({ data: null, error: e.message });
        }
    }
});

router.post('/createProject', helper.verifyToken, async function (req, res) {
    try {
        const data = helper.verifyUser(req, config.accessList.all);
        if (data) {
            projectService.createProject(req, res).then(result => {
                res.status(result.code).json({ data: result.data, error: result.error });
            }).catch(err => {
                const result = helper.createResponse(500, null, err.message);
                res.status(result.code).json({ data: result.data, error: result.error });
            });
        } else {
            res.status(403).json({ data: "Access Denied", error: null });
        }
    } catch (e) {
        if (e.expiredAt)
            res.status(401).json({ data: null, error: "Unauthorized access" });
        else {
            res.status(500).json({ data: null, error: e.message });
        }
    }
});

module.exports = router;