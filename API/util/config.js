const syncsql = require('sync-sql');

server = {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT
}

db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
};

crypt = {
    secret: process.env.CRYPT_SECRET,
    token_expire: process.env.TOKEN_EXPIRE
}

mail = {
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD
}

accessList = {
    adminOnly : [1],
    developerOnly: [2],
    supervisorOnly: [3],
    projectManagerOnly: [4],
    all : [1, 2, 3, 4]
};

module.exports = {
    db,
    server,
    crypt,
    mail,
    accessList,
    //Execute Mysql commands
    executeQuery: (sql) => {
        return syncsql.mysql(db, sql);
    }
};