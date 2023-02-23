# Organize my Business

[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![github][github-shield]][github-url]

## Description

This application is a Content Management System (CMS), which is built using Node.js, and the MySQL2, inquirer, & console.table packages, to create, read, update, and delete information in a database. 

It is intended to be used by employers/business owners to be able to organize & store their company's departments, roles, and employees, to be better able to plan for & manage their business.

## Table of Contents

- [Description](#description)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Questions](#questions)

## Getting Started

##### Prerequisites

- Install [Node.js] following the steps in the documentation (https://nodejs.org/en/download/)
- Install the [MySQL2 package] following the steps in the documentation (https://www.npmjs.com/package/mysql2)

## Installation

Users can follow the video walkthrough attached below or the steps listed.
- Clone the repo
  ```sh
  git clone https://github.com/MadelineLowes/organize-my-business
  ```
- Install dependencies
  ```sh
  npm install
  ```
- On line 19 in the server.js file, replace the mysql password value with the user's own:
  ```sh
 const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '', // user's password goes here
        database: 'company_db'
    },
)
  ```
- Login to mysql:
  ```sh
  mysql -u root -p
  // enter user's mysql password; same value as the step above
  ```
- Create the database:
  ```sh
    SOURCE db/schema.sql
  ```
- Seed table to the database:
  ```sh
    SOURCE db/seeds.sql
  ```
- Exit mysql:
  ```sh
    quit
  ```

## Usage

Users can follow the video walkthrough attached below or the steps listed.

- Start/restart the app:
  ```sh
    node server.js
  ```
- If at any point the user would like to exit the app, use up and down arrow keys to select "Quit"
- Scroll through the app's options using up and down arrow keys; the options are descriptive and intuitively named
- View the app's default options, displayed as tables, by selecting "View all departments", "View all roles", and/or "View all employees"
- View the app's viewing capabilities, displayed as tables, by selecting "View employees by manager",and "View employees by department"
- Add a department by selecting "Add department" and follow the prompts:
  ```sh
    "What is the name of the department?" *input value* 
  ```
- Add a role by selecting "Add role" and follow the prompts:
  ```sh
    "What is the title of the role?" *input value*
    "What department does this role belong to?" *use up and down arrow keys to select*
    "What is the salary of this role?" *input numerical value*
  ```
- Add an employee by selecting "Add employee" and follow the prompts:
  ```sh
    "What is the first name of the employee?" *input value*
    "What is the last name of the employee?" *input value*
    "What is this employees title/role?" *use up and down arrow keys to select*
    "Who is this employees manager?" *use up and down arrow keys to select*
  ```
- Update an employees role by selecting "Update employee's role" and follow the prompts:
  ```sh
    "What is the name of the employee you would like to update?" *use up and down arrow keys to select*
    "What would you like to update their role to?" *use up and down arrow keys to select*
  ```
- Update an employees manager by selecting "Update employee's manager" and follow the prompts:
  ```sh
    "What is the name of the employee you would like to update?" *use up and down arrow keys to select*
    "Who would you like to update their manager to?" *use up and down arrow keys to select*
  ```
- Delete an employee by selecting "Delete employee" and follow the prompts:
  ```sh
    "Which employee would you like to delete?" *use up and down arrow keys to select*
  ```

Walk-through video:


## Credits

https://bobcares.com/blog/mysql-error-code-1054/#:~:text=MySQL%20error%20code%201054%20occurs,due%20to%20any%20missing%20column
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
https://dev.mysql.com/doc/refman/8.0/en/
https://dev.mysql.com/doc/refman/8.0/en/join.html
https://www.digitalocean.com/community/tutorials/nodejs-interactive-command-line-prompts
https://www.geeksforgeeks.org/number-validation-in-javascript/
https://kinsta.com/knowledgebase/mysql-error-1064/#:~:text=The%20MySQL%201064%20error%20is,between%20you%20and%20your%20database
https://learnsql.com/blog/how-to-join-3-tables-or-more-in-sql/
https://www.npmjs.com/package/console.table
https://www.npmjs.com/package/mysql2
https://www.npmjs.com/package/inquirer/v/8.2.4
https://www.sqlservertutorial.net/sql-server-basics/sql-server-insert-multiple-rows/
https://stackoverflow.com/questions/14790910/stop-all-instances-of-node-js-server
https://stackoverflow.com/questions/31875621/how-to-properly-return-a-result-from-mysql-with-node
https://stackoverflow.com/questions/65415706/how-to-get-index-value-of-choice-made-with-inquirer

## License

This project is covered by MIT licensing.
https://opensource.org/licenses/MIT

## Questions

Madeline Lowes:
email: madeline.lowes@gmail.com
github profile: https://github.com/MadelineLowes

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/MadelineLowes/organize-my-business.svg?style=for-the-badge
[contributors-url]: https://github.com/MadelineLowes/organize-my-business/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/MadelineLowes/organize-my-business.svg?style=for-the-badge
[issues-url]: https://github.com/MadelineLowes/organize-my-business/issues
[license-shield]: https://img.shields.io/github/license/MadelineLowes/organize-my-business.svg?style=for-the-badge
[license-url]: https://github.com/MadelineLowes/organize-my-business/blob/main/LICENSE
[github-shield]: https://img.shields.io/badge/-github-black.svg?style=for-the-badge&logo=github&colorB=555
[github-url]: https://github.com/MadelineLowes/organize-my-business
