Fileupload example amazon-s3
==========================
Example to upload a file to amazon s3, using Amazon S3 sdk 


**AWS-SDK**  [http://aws.amazon.com/sdkfornodejs/](http://aws.amazon.com/sdkfornodejs/)


To install all dipendencies, open a terminal and navigate to the directory you cloned the project to. Then run the following commands:

```
npm install
```
## Configuration



If you want to enable Amazon S3 services make sure to set the appropriate environment variables:

| Provider | Key | Default value |
| ---------| ----| --------------|
| Amazon S3  | accessKeyId    | - |
| Amazon S3  | secretAccessKey | - |


[You can find it with this guide](http://blogs.aws.amazon.com/security/post/Tx1R9KDN9ISZ0HF/Where-s-my-secret-access-key)


**Configuration file**

You have to insert the keys in the file `config.json` 

```
{
    "accessKeyId": "YOUR_KEY",
    "secretAccessKey": "YOUR_KEY",
    "region": "YOUR_REGION"
}

```
For more informations about region [http://docs.aws.amazon.com/general/latest/gr/rande.html](http://docs.aws.amazon.com/general/latest/gr/rande.html)
 
## Start
To run the server locally, open a terminal and navigate to the directory you cloned the project to. Then run the following commands:

```
npm start
```

** Your server is started on localhostat port:3000** [http://localhost:3000/](http://localhost:3000/)

## API


| Method | Path | Description |
| ---------| ----| --------------|
| GET  	| /    | Show the HTML upload form|
| GET  	| /info | Show your bucket information|
| POST  | /upload | upload your file and sent it to AmazonS3 |


## AWS-SDK  Code for upload

You can confugure your file information

```
            // File configuration 
            var params = {
                Bucket: 'yourBucketName',
                Key: 'myImage.png',
                Body: data //  in this exmample is a Buffer from POST
            };
            
```

```
            s3.putObject(params, function (error, data) { 	

                if (error) {
                    console.log(error)
                    resp.json(500, error);

                } else {
                    console.log("Successfully uploaded");
                    resp.json(200, 'File uploaded');
                }

            });
``` 


## License
```
The MIT License (MIT)

Copyright (c) 2014 Andrea Giglio

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
