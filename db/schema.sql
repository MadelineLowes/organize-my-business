DROP DATABASE IF EXISTS COMPANY_DB;

CREATE DATABASE IF NOT EXISTS COMPANY_DB;

USE COMPANY_DB;

CREATE TABLE DEPARTMENT(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    DEP_NAME VARCHAR(30)
);

CREATE TABLE ROLE(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    DEP_ID INT,
    TITLE VARCHAR(30) NOT NULL,
    SALARY DECIMAL,
    FOREIGN KEY (DEP_ID) REFERENCES DEPARTMENT(ID)
);

CREATE TABLE EMPLOYEE(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    FIRST_NAME VARCHAR(30) NOT NULL,
    LAST_NAME VARCHAR(30) NOT NULL,
    ROLE_ID INT,
    FOREIGN KEY (ROLE_ID) REFERENCES ROLE(ID) MANAGER_ID INT,
    FOREIGN KEY (EMPLOYEE_ID) REFERENCES EMPLOYEE(ID)
);