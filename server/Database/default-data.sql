INSERT INTO usr_Role VALUES
(0, 'Admin', 'System Administrator', 1),
(0, 'User', 'Regular User', 1),
(0, 'Developer', 'Developer', 1),
(0, 'Supervisor', 'Supervisor', 1);

INSERT INTO usr_User
VALUES ('0', 'Nipun', 'Amarasekara', 'namarasekara@gmail.com', '$2a$10$/8C.EnfAysoyOOINKc.0KO1qo2OILFjKPzkr00Ubi5Bb2XM0/D2aG', '1', '1', '0', '2022-05-16', NULL);

INSERT INTO z_ProjectCategory VALUES
(0, 'Applications', 'Applications'),
(0, 'Common', 'Common');

INSERT INTO z_ProjectType VALUES
(0, 'Software', 'Software'),
(0, 'Docs', 'Docs');

INSERT INTO `z_Project` (`id`, `name`, `description`, `projectType`, `projectCategory`, `projectLead`, `url`, `createdBy`, `createdOn`, `isActive`, `isDeleted`) VALUES ('0', 'test', 'test', '1', '2', '1', NULL, '1', CURRENT_TIMESTAMP, '1', '0');