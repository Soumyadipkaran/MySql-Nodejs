# User Management App

A simple **User Management App** built with **Node.js**, **Express**, **MySQL**, and **EJS** for templating. This app allows users to be listed, edited, and updated using MySQL as the database.

---

## Features
- View total user count on the home page
- Display all users in a table
- Edit user information with password authentication
- MySQL database integration
- Express.js backend with EJS templating

---

## Technologies Used
- **Node.js** (Server-side JavaScript runtime)
- **Express.js** (Web framework for Node.js)
- **MySQL2** (MySQL database connection and queries)
- **EJS** (Embedded JavaScript templating)
- **Faker.js** (Generate random user data)
- **Method-Override** (Allow form submissions to send PATCH requests)

---

## Installation & Setup

### 1. Clone the Repository
```sh
https://github.com/Soumyadipkaran/MySql-Nodejs.git
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Setup MySQL Database
- Create a MySQL database named `sdk_app`.
- Use the following SQL command to create the `user` table:

```sql
CREATE TABLE user (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

### 4. Configure Database Connection
Update the `connection` settings in `index.js`:
```js
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sdk_app',
    password: '**********'
});
```

### 5. Run the Application
```sh
npm start
```
OR
```sh
nodemon index.js
```

The server will start at: `http://localhost:8080`

---

## Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Home page with user count |
| GET | `/user` | List all users |
| GET | `/user/:id/edit` | Edit user details |
| PATCH | `/user/:id` | Update user details (with password verification) |

---

## Sample Fake Data
To generate 100 fake users, uncomment the following block in `index.js`:
```js
let q = "INSERT INTO user (id, username, email, password) VALUES ?";
let data = [];
for (let i = 1; i <= 100; i++) {
    data.push(getRandomUser());
}

connection.query(q, [data], (err, results) => {
    if (err) throw err;
    console.log(results);
});
connection.end();
```

Run the script once to populate the database.

---
