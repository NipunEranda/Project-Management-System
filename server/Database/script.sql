
DROP DATABASE IF EXISTS `pms`;

CREATE DATABASE IF NOT EXISTS pms DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pms`;

CREATE TABLE usr_Role (
  id bigint(200) AUTO_INCREMENT NOT NULL,
  roleName varchar(255) NOT NULL,
  roleDesc varchar(255) DEFAULT NULL,
  isActive BOOLEAN NOT NULL,
  CONSTRAINT usr_role_pk PRIMARY KEY(id)
);

CREATE TABLE usr_User(
    id BIGINT(200) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) DEFAULT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) DEFAULT NULL,
    roleId bigint(200) DEFAULT NULL,
    isActive BOOLEAN NOT NULL,
    isDelete BOOLEAN NOT NULL,
    createdAt DATE DEFAULT NULL,
    deletedAt DATE DEFAULT NULL,
    CONSTRAINT usr_User_pk PRIMARY KEY(id, email),
    CONSTRAINT usr_User_fk_roleId FOREIGN KEY(roleId) REFERENCES usr_Role(id)
);