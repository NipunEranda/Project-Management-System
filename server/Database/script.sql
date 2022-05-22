
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

CREATE TABLE z_ProjectType(
    id bigint(200) AUTO_INCREMENT NOT NULL,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    CONSTRAINT z_ProjectType_pk PRIMARY KEY(id)
);

CREATE TABLE z_ProjectCategory(
    id bigint(200) AUTO_INCREMENT NOT NULL,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    CONSTRAINT z_ProjectType_pk PRIMARY KEY(id)
);

CREATE TABLE z_Project(
    id bigint(200) AUTO_INCREMENT NOT NULL,
    name varchar(255) NOT NULL,
    description varchar(255) DEFAULT NULL,
    projectType BIGINT(200) NOT NULL,
    projectCategory BIGINT(200) DEFAULT NULL,
    projectLead BIGINT(200) NOT NULL,
    url TEXT DEFAULT NULL,
    createdBy BIGINT(200) NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    isActive BOOLEAN NOT NULL DEFAULT 1,
    isDelete BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT z_Project_pk PRIMARY KEY(id),
    CONSTRAINT Z_Project_fk_projectType FOREIGN KEY(projectType) REFERENCES z_ProjectType(id),
    CONSTRAINT z_Project_fk_projectCategory FOREIGN KEY(projectCategory) REFERENCES z_ProjectCategory(id),
    CONSTRAINT z_Project_fk_createdBy FOREIGN KEY(createdBy) REFERENCES usr_User(id),
    CONSTRAINT z_Project_fk_projectLead FOREIGN KEY(projectLead) REFERENCES usr_User(id)
);
