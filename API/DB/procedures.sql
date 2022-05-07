USE `pms`;

/*Start of User Management*/
    /*Update User Details*/
        delimiter / /

        CREATE PROCEDURE user_updateUserDetails (
            IN fname VARCHAR(255)
            ,IN lname VARCHAR(255)
            ,IN phoneNo VARCHAR(10)
            ,IN gender VARCHAR(1)
            ,IN id BIGINT (200)
            ,OUT STATUS INT
            )

        BEGIN
            /*Start Error Handling*/
            DECLARE EXIT HANDLER
            FOR SQLEXCEPTION

            BEGIN
                ROLLBACK;

                SET STATUS = 0;

                SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
            END;

            /*End Error Handling*/
            START TRANSACTION;

            UPDATE usr_User
            SET usr_User.fname = fname
                ,usr_User.lname = lname
                ,usr_User.phoneNo = phoneNo
                ,usr_User.gender = gender
            WHERE usr_User.id = id;

            SET STATUS = 1;

            COMMIT;
        END / /

        delimiter / /

    /*Delete User*/
        delimiter / /

        CREATE PROCEDURE user_deleteUser (
            IN id BIGINT (200)
            ,OUT STATUS INT
            )

        BEGIN
            /*Start Error Handling*/
            DECLARE EXIT HANDLER
            FOR SQLEXCEPTION

            BEGIN
                ROLLBACK;

                SET STATUS = 0;

                SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
            END;

            /*End Error Handling*/
            START TRANSACTION;

            UPDATE usr_User
            SET usr_User.isDelete = 1
                ,usr_User.isActive = 0
            WHERE usr_User.id = id;

            SET STATUS = 1;

            COMMIT;
        END / /

        delimiter / /

    /*Change Password*/
        delimiter / /

        CREATE PROCEDURE user_changePassword (
            IN password VARCHAR(255)
            ,IN email VARCHAR(255)
            ,OUT STATUS INT
            )

        BEGIN
            /*Start Error Handling*/
            DECLARE EXIT HANDLER
            FOR SQLEXCEPTION

            BEGIN
                ROLLBACK;

                SET STATUS = 0;

                SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
            END;

            /*End Error Handling*/
            START TRANSACTION;

            UPDATE usr_Login
            SET usr_Login.password = password
            WHERE usr_Login.email = email;

            SET STATUS = 1;

            COMMIT;
        END / /

        delimiter / /

    /*Forgot Password*/
        delimiter / /

        CREATE PROCEDURE user_forgotPassword (
            IN password VARCHAR(255)
            ,IN userId BIGINT (200)
            ,OUT STATUS INT
            )

        BEGIN
            /*Start Error Handling*/
            DECLARE EXIT HANDLER
            FOR SQLEXCEPTION

            BEGIN
                ROLLBACK;

                SET STATUS = 0;

                SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
            END;

            /*End Error Handling*/
            START TRANSACTION;

            UPDATE usr_Login
            SET usr_Login.password = password
            WHERE usr_Login.userId = userId;

            SET STATUS = 1;

            COMMIT;
        END / /

        delimiter / /

    /*Email Confirmation*/
        delimiter / /

        CREATE PROCEDURE user_confirmEmailConfirmation (
            IN email VARCHAR(255)
            ,IN confirmationCode VARCHAR(255)
            ,OUT STATUS INT
            )

        BEGIN
            /*Start Error Handling*/
            DECLARE EXIT HANDLER
            FOR SQLEXCEPTION

            BEGIN
                ROLLBACK;

                SET STATUS = 0;

                SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
            END;

            /*End Error Handling*/
            START TRANSACTION;

            UPDATE usr_Login
            SET usr_Login.isConfirmed = 1
            WHERE usr_Login.email = email
                AND usr_Login.confirmationCode = confirmationCode;

            SET STATUS = 1;

            COMMIT;
        END / /

        delimiter / /

    /*Request Email Confirmation Code*/
        delimiter / /

        CREATE PROCEDURE user_requestEmailConfirmationCode (
            IN confirmationCode VARCHAR(255)
            ,IN email VARCHAR(255)
            ,OUT STATUS INT
            )

        BEGIN
            /*Start Error Handling*/
            DECLARE EXIT HANDLER
            FOR SQLEXCEPTION

            BEGIN
                ROLLBACK;

                SET STATUS = 0;

                SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
            END;

            /*End Error Handling*/
            START TRANSACTION;

            UPDATE usr_Login
            SET usr_Login.confirmationCode = confirmationCode
            WHERE usr_Login.email = email;

            SET STATUS = 1;

            COMMIT;
        END / /

        delimiter / /

    /* Register User */
        delimiter / /

        CREATE PROCEDURE user_Registration (
            /*usr_User*/
            IN fname VARCHAR(255)
            ,IN lname VARCHAR(255)
            ,IN phoneNo VARCHAR(15)
            ,IN gender VARCHAR(1)
            ,
            /*usr_Login*/
            IN email VARCHAR(255)
            ,IN password VARCHAR(255)
            ,IN confirmationCode VARCHAR(8)
            ,IN role BIGINT(200),
            OUT STATUS INT
            )

        BEGIN
            DECLARE userID BIGINT (200);
            /*Start Error Handling*/
            DECLARE EXIT HANDLER
            FOR 1062

            BEGIN
                ROLLBACK;

                SET STATUS = 0;

                SELECT CONCAT ('Duplicate key occurred') AS message;
            END;

            DECLARE EXIT HANDLER
            FOR SQLEXCEPTION

            BEGIN
                ROLLBACK;

                SET STATUS = 0;

                SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
            END;

            /*End Error Handling*/
            START TRANSACTION;

            INSERT INTO usr_User (
                fname
                ,lname
                ,phoneNo
                ,gender
                ,isActive
                ,isDelete
                )
            VALUES (
                fname
                ,lname
                ,phoneNo
                ,gender
                ,1
                ,0
                );

            SELECT MAX(id)
            INTO userID
            FROM usr_User;

            INSERT INTO usr_Login
            VALUES (
                userID
                ,email
                ,password
                ,role
                ,0
                ,confirmationCode
                );

            SET STATUS = 1;

            COMMIT;
        END / /

        delimiter / /

/*End of User Management*/