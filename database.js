const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost/";

function addPosts(pPost) {
    MongoClient.connect(url,
        function(err, db) {
            if (err) return console.log("error",err);

            var dbo = db.db("jsonplaceholder");
            dbo.collection("posts").insertMany(pPost, function(err, res) {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
                db.close();
            });
            db.close();
        });
}

function getPosts() {
    return new Promise((resolve,reject) => {
        MongoClient.connect(url,
            function(err, db) {
                if (err) return reject(err) ;

                var dbo = db.db("jsonplaceholder");
                dbo.collection("posts").find({}).toArray(function(err, result) {
                    if (err) throw err;
                    resolve(result);
                    db.close();
                  });
            });
    } );
}

module.exports = {
    add: addPosts,
    getAll: getPosts
}