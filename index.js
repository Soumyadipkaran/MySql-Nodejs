const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const { faker } = require('@faker-js/faker');
const methodOverride = require("method-override");

const app = express();

// Set up the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));

let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sdk_app',
    password: 'sd_4134karan'
});
//Home Route
app.get("/", (req, res) => {
    let q = `SELECT count(*) FROM user`;
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            console.log(results);
            let count = results[0]["count(*)"];
            res.render("home.ejs", {count});
        });
    } catch (err) {
        console.log(err);
        res.send("Something went wrong in the database!");
    }
});
// SHow route
app.get("/user", (req, res) => {
    let q = `SELECT * FROM user`;
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            res.render("user.ejs",{results});
        });
    } catch (err) {
        console.log(err);
        res.send("Something went wrong in the database!");
    }
});


//edit
app.get("/user/:id/edit", (req, res) => {
    let {id}=req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            res.render("edit.ejs",{user});
        });
    } catch (err) {
        console.log(err);
        res.send("Something went wrong in the database!");
    }
});
//update
app.patch("/user/:id",(req,res)=>{
    let {id}=req.params;
    let {password: formPass, username : newUsername}=req.body;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];

            if(formPass != user.password){
                res.send("Wrong Password");
            }else{
                let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
                try {
                    connection.query(q2, (err, result) => {
                        if (err) throw err;
                        res.redirect("/user");
                        
                    });
                } catch (err) {
                    console.log(err);
                    res.send("Something went wrong in the database!");
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.send("Something went wrong in the database!");
    }
});


app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

// Uncomment this block if you want to insert fake data
/*
let q = "INSERT INTO user (id, username, email, password) VALUES ?";
let data = [];
for (let i = 1; i <= 100; i++) {
    data.push(getRandomUser()); // 100 fake users
}

try {
    connection.query(q, [data], (err, results) => {
        if (err) throw err;
        console.log(results);
    });
} catch (err) {
    console.log(err);
}
connection.end();
*/
