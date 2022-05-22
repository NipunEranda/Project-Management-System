const helper = require('../util/helper');
const config = require('../util/config');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const getAllProjects = async (req, res) => {
    let result = null;
    try {
        result = await config.executeQuery(`SELECT * FROM z_Project WHERE isActive = 1 AND isDelete = 0`);
        if (result.data.rows.length > 0) {
            return helper.createResponse(200, result.data.rows, null);
        } else {
            return helper.createResponse(400, null, "No Projects found.");
        }
    } catch (err) {
        return helper.createResponse(500, null, err.message);
    }
}

const getProjectsByUser = async (req, res) => {

}

const getProjectById = async (req, res) => {

}

const createProject = async (req, res) => {
    
}

const updateProject = async (req, res) => {
    
}

const deleteProject = async (req, res) => {
    
}

module.exports = {
    getAllProjects,
    getProjectsByUser,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
}