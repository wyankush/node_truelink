const express = require('express');
const db = require("./database");
const path = require("path");
const fetchUsers = require("./fetchUsers");

const server = express();
server.set("view engine","pug");
server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')));

server.get("/", (req,res) => {
    db.getAll().then( (result) => {
        fetchUsers().then( (users) => {
            res.render("index", {posts: result, users: users});
        });
    }).catch( (error) => {
        res.render("error", {error: error});
    });
});

server.listen(8000, () => console.log("listening to 8000 . . . "));