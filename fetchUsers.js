const https = require("https");

function fetchUsers() {

    return new Promise( (resolve,reject) => {
        https.get('https://jsonplaceholder.typicode.com/users', res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                body = JSON.parse(body);
                let users = {};
                for(let i in body) {
                    users[body[i].id] = body[i];
                };
                resolve(users);
            });
        }).on("error", (error) => {
            console.log("Error: " + error.message);
            reject(error.message);
        });
    });
}

module.exports = fetchUsers;

