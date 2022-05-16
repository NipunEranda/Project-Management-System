const syncsql = require('sync-sql');
require('dotenv').config();
const secret = process.env.pms_auth_secret;
const tokenExpireAfter = '6h';
const hostIP = process.env.pms_hostIP;
const hostPORT = process.env.pms_hostPORT;
const emailUser = process.env.pms_mail_user;
const emailPw = process.env.pms_mail_auth;

db = {
    host: process.env.pms_db_host,
    user: process.env.pms_db_user,
    password: process.env.pms_db_password,
    database: process.env.pms_db_database,
    multipleStatements: true
};

accessList = {
    adminOnly : [1],
    userOnly: [2],
    developerOnly: [3],
    SupervisorOnly: [4],
    all : [1, 2, 3, 4]
};

//Exports list
module.exports = {
    secret,
    tokenExpireAfter,
    hostIP,
    db,
    accessList,
    hostPORT,
    emailUser,
    emailPw,
    //Execute Mysql commands
    executeQuery: (sql) => {
        return syncsql.mysql(db, sql);
    }
}