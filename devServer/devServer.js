//https://safe-refuge-62214.herokuapp.com/ | https://git.heroku.com/safe-refuge-62214.git

let http = require('http');

let url = require('url');
let fs = require('fs'); // to work with file system  Read files Create files Update files Delete files Rename files
//let cookie = require('cookie');

//host: '176.38.114.66'


/* Write data to request body
reqFromServer.write(postData);
reqFromServer.end();*/

const fileExtToContentType = {'html': 'text/html','js': 'application/javascript','json': 'application/json',
    'css': 'text/css'};


function getContentType(fileExt, fileExtToContentType) {
    for( var fileToExt in fileExtToContentType ) {
        if (fileExt == fileToExt){
            return fileExtToContentType[fileToExt];
        }
    }
    return false;
}

function getRouteFromPathForFile(path) {
    if (path === "/") {
        return "../index.html";
    }
    if (!path.includes(".")) {
        return;
    } else {
        return".." + path;
    }
}

function getFileExt(pathToFile) {
    var fileSplitted = pathToFile.split('.');
    return fileSplitted[fileSplitted.length - 1];
}

let serv = http.createServer({}, function ( req, res ) {
    let req_url = url.parse(req.url, true); //true - parse query_string parameters, url.parse(..).query  - URL ?params object
    console.log("request to server: " + req.url);
    let reqPathToFile;
    let requestToService;
    reqPathToFile = getRouteFromPathForFile(req.url);
    fs.readFile(reqPathToFile, function (err, data) {
        if (err) {
            res.statusCode = 500; // internal server error
            res.end("Error:" + err.message);
        } else {
            let fileExt = getFileExt(reqPathToFile);
            let contType = getContentType(fileExt, fileExtToContentType);
            // when we specify some headers we also need as first argument put statusCode !!!!
            res.writeHead(200, {'Content-Type': contType});
            //res.setHeader('Set-Cookie',cookie.serialize('name','vlas'));
            //let cookArr = req.headers.cookie.split('=');
            //console.log(  /*cookArr[0] + ":" + */cookArr[1]);
            //it is important to understand that if text/plain will be setted browers will not
            //  render this as text/html, so to render it should be setup to text/html
            // js - {'Content-Type': 'application/xhtml+xml'};
            // json - {'Content-Type': 'application/json'}
            res.end(data);
            //This method signals to the server that all of the response headers and body have been sent; that server should consider
            //this message complete. The method, response.end(), MUST be called on each response.
            //If data is specified, it is equivalent to calling response.write(data, encoding) followed by response.end(callback).
            //If callback is specified, it will be called when the response stream is finished.
            return;
        }
    });
}).listen(8080, '127.0.0.22');
