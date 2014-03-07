var express = require("express");
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var app = express()
var s3 = new AWS.S3();

/// Include the express body parser
app.configure(function () {
    app.use(express.bodyParser());
});

// Html form with  ction='/upload' and enctype='multipart/form-data'

var form = "<!DOCTYPE HTML><html><body>" +
    "<form method='post' action='/upload' enctype='multipart/form-data'>" +
    "<input type='file' name='image'/>" +
    "<input type='submit' /></form>" +
    "</body></html>";


// Show Upload form
app.get('/', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(form);

});

/// Include the node file module
var fs = require('fs');

// get the file from post and send it to Amazon
app.post('/upload', function (req, resp) {

    fs.readFile(req.files.image.path, function (err, data) {

        var imageName = req.files.image.name

        /// If there's an error
        if (!imageName) {
            console.log("There was an error")
            resp.redirect("/");
            resp.end(500);

        } else {

            // File configuration 
            var params = {
                Bucket: 'yourBucketName',
                Key: 'myImage.png',
                Body: data
            };

            s3.putObject(params, function (error, data) {

                if (error) {
                    console.log(error)
                    resp.json(500, error);

                } else {
                    console.log("Successfully uploaded data to myBucket/myKey");
                    resp.json(200, 'File uploaded');
                }

            });
        }
    });
});
app.get('/info', function (req, resp) {

    s3.listBuckets(function (error, data) {
        if (error) {
            console.log(error); // error is Response.error
            resp.json(500, error);
        } else {
            console.log(data); // data is Response.data
            resp.json(200, data);
        }
    });

});

app.listen(3000);