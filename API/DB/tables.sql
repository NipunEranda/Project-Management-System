DROP DATABASE IF EXISTS `pms`;

CREATE DATABASE IF NOT EXISTS `pms` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pms`;

CREATE TABLE usr_User (
  id bigint(200) AUTO_INCREMENT NOT NULL,
  fname varchar(255) NOT NULL,
  lname varchar(255) NOT NULL,
  phoneNo varchar(15) DEFAULT NULL,
  gender varchar(1) DEFAULT NULL,
  isActive BOOLEAN NOT NULL,
  isDelete BOOLEAN NOT NULL,
  CONSTRAINT usr_User_pk PRIMARY KEY(id)
);

CREATE TABLE usr_Role (
  id bigint(200) AUTO_INCREMENT NOT NULL,
  roleName varchar(255) NOT NULL,
  roleDesc varchar(255) DEFAULT NULL,
  isActive BOOLEAN NOT NULL,
  CONSTRAINT usr_role_pk PRIMARY KEY(id)
);

CREATE TABLE usr_Login (
  userId bigint(200) DEFAULT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) DEFAULT NULL,
  roleId bigint(200) DEFAULT NULL,
  isConfirmed int(1) NOT NULL,
  confirmationCode varchar(8) NOT NULL,
  CONSTRAINT usr_login_pk PRIMARY KEY(email),
  CONSTRAINT usr_login_fk FOREIGN KEY(userId) REFERENCES usr_User(id),
  CONSTRAINT usr_login_fk_roleId FOREIGN KEY(roleId) REFERENCES usr_Role(id)
);