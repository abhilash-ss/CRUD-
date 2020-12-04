## CRUD APP USING REACT, NODEJS, PASSPORT, MYSQL

It is a simple react application using React, nodejs, passport, mysql. Here is using Nextjs for the frontend.

## How TO RUN ?

1. First clone the repo.
2. Create a database in your local machine. (prefered name for database is "test").
3. For now this code includes .env file. If you are using any other name for the database please also upadte it on the .env file.
4. Now you need to create admin using the below CURL: <br />
   `curl --location --request POST 'http://127.0.0.1:2900/api/user/addAdmin' \ --header 'Content-Type: application/json' \ --header 'Cookie: connect.sid=s%3A04400191-d7f8-41da-b886-ff615866ebd5.0YpoU9deVIcbEwSj6cz%2BB8xpGqxah%2Fq4ma0MhUVnmjE' \ --data-raw '{ "email":"admin@email.com", "password": "password" }'`

5. Run `yarn` for installing the dependencies.
6. Run `yarn dev`. Now the applciation will load on http://localhost:2900/
