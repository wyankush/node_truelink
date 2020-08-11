const db = require("./database");
const https = require("https");

function fetchAndToDatabase() {
    fetchPosts();
}

function fetchPosts() {

    https.get('https://jsonplaceholder.typicode.com/posts', res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
            body += data;
        });
        res.on("end", () => {
            body = JSON.parse(body);
            addToDatabase(body)
        });
    }).on("error", (error) => {
        console.log("Error: " + error.message);
    });
}

function addToDatabase(pPosts) {
    db.add(pPosts);
}

fetchAndToDatabase();

