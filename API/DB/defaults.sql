USE `pms`;

INSERT INTO usr_Role (id, roleName, roleDesc, isActive) VALUES
(0, 'Admin', 'Admin', 1),
(0, 'Developer', 'Developer', 1),
(0, 'Supervisor', 'Supervisor', 1),
(0, 'Project Manager', 'Project Manager', 1);

/*Insert Admin Details*/
INSERT INTO `usr_User` (`id`, `fname`, `lname`, `phoneNo`, `gender`, `address`, `isActive`, `isDelete`) VALUES
(1, 'Admin', 'Admin', '0770415266', 'M', 1, 0);

INSERT INTO `usr_Login` (`userId`, `email`, `password`, `roleId`, `isConfirmed`, `confirmationCode`) VALUES
(1, 'namarasekara71@gmail.com', '$2a$10$PELFRKkUW9sHiTfvW9y3A.gwKq2iG6jrRAd05HLGiUx1hRo/GZDKa', 2, 1, 'f72Kym');