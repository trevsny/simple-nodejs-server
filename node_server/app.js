//get the http module.  Comes already with Node.js
var http = require('http');
//fs module allows us to read and write content for responses.  Comes with Node.js
var fs = require('fs');
//creating a server using http module:
var server = http.createServer((request, response) => {   //callback with request and response parameters are the HTTP request and response received and sent by server
    //see what URL the client is requesting:
    console.log('client request URL: ', request.url);
//read() how a file is obtained from server
//write() how a file is served to client or output
    //how to do routing:
    if(request.url === '/') {
        console.log("Before first response")
        fs.readFile('index.html', 'utf8', (errors, contents) => {   //readFile takes in 3 arguments, one being a callback. All 3 are necessary
            response.writeHead(200, {'Content-Type': 'text/html'});   //send data about response.  200 OK, type of content being served
            response.write(contents);  //send response body
            response.end();
            
        });
            
    }  else if (request.url === '/style.css'){
        fs.readFile('style.css','utf-8', (errors, contents) => {
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.write(contents);
            response.end()
        });
    } else {
        //request didn't match anything 
        //Could have this:
        // fs.readFile('error.html', 'utf8', function(errors, contents){
        //     response.writeHead(200); //Content-Type dictionary not necessary to correctly send file back
        //     response.write(contents);
        //     response.end();
 
        // })

        //Another response could just be: 
        response.writeHead(404);  //Will display "File not found" without status code written
        response.end("File not found");
    }
});
//Knowing HTTP status codes is paramount


//tell server which port to listen/run on
server.listen(6789);
//print to terminal
console.log("Running on port 6789");