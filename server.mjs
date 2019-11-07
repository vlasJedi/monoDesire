//https://safe-refuge-62214.herokuapp.com/ | https://git.heroku.com/safe-refuge-62214.git
//let data = require( './quest_data' );
import https from 'https';
import http from 'http';
import privatBankService from './serverModules/PrivatBank/privatBankService.mjs';

import url from 'url';
import fs from 'fs'; // to work with file system  Read files Create files Update files Delete files Rename files
import path from 'path';
//let cookie = require('cookie');

var error500 = 'Server internal error';
var privateKey = fs.readFileSync('./credentials/whatIsTime.com.key');
var certificate = fs.readFileSync('./credentials/whatIsTime.com.pem');
var caVlasCo = fs.readFileSync('./credentials/vlasRootCert.ca-bundle');

var options = {
	key: privateKey,
	cert: certificate,
	ca: caVlasCo,
	rejectUnauthorized: false};
const postData = '<?xml version="1.0" encoding="UTF-8"?>'+
	'<request version="1.0">'+
	'<merchant>'+
	'<id>75482</id>'+
	'<signature>ab871c9601cf28920c4c0ff63041ea585da9de89</signature>'+
	'</merchant>'+
	'<data>'+
	'<oper>cmt</oper>'+
	'<wait>0</wait>'+
	'<test>0</test>'+
	'<payment id="">'+
	'<prop name="cardnum" value="5168742060221193" />'+
	'<prop name="country" value="UA" />'+
	'</payment>'+
	'</data>'+
	'</request>';

const optionsReq = {
	hostname: 'api.privatbank.ua',
	port: 443,
	path: '/p24api/balance',
	method: 'POST',
	headers: {
		'Content-Type': 'text/xml',
	},
	protocol: 'https:'
};
//host: '176.38.114.66'

const reqFromServer = https.request(optionsReq, function (resOuterServer) {
	let data = '';
	resOuterServer.on('data', function (chunk) {
		data += chunk;
		console.log('BODY: ' + chunk);
	});
	resOuterServer.on('end', function () {
		console.log(data);
	});
});

reqFromServer.on('error', function (error) {
	console.error('problem with request: ' + error.message);
});

// Write data to request body
reqFromServer.write(postData);
reqFromServer.end();

//server.listen(2223, '127.0.0.27');

/*function sendFile( file, res) {
	file.pipe( res );
	file.on( 'error', ( err ) => {
		res.statusCode = 500;
		res.end("Server Error");
	});
	res.on('close', () => file.destroy() );
}*/
var pathToFiles = {'/': 'index.html','/index.html':'index.html','/index.js':'index.js','/main.js': 'main.js',
	'/require.js': 'require.js', '/config.json':'config.json'};
var lib = ['/node_modules', '/scripts','/styles'];
var fileExtToContentType = {'html': 'text/html','js': 'application/javascript','json': 'application/json',
	'css': 'text/css'};
var secretForJWT = "vlas";
//'/authentificate': sendJWT,
var servicesAPI = { '/callPrivatService': privatBankService.getBalance()};

function checkUrlToLib( urlToCheck, lib ) {
	var regEx;
	for ( var pathInLib in lib ) {
		regEx = new RegExp( "^\\" + lib[pathInLib] );
		if ( regEx.test( urlToCheck ) ) {
			return true;
		}
	}
	return false;
}
function getUrlToRoot( urlToCheck, root ) {
	for ( var path in root ) {
		if ( path == urlToCheck ) {
			return root[urlToCheck];
		}
	}
	return false;
}
function tryToResolveURLAsCallToAPI( req_url, servicesAPI ) {
	Object.keys(servicesAPI).forEach(function (serviceURL) {
		if (serviceURL === req_url ) {
			return true;
		}
	});
	return false;
};

function getReqPathToFile( req_url, rootFiles, libFiles ) {
	var resultPath = getUrlToRoot( req_url, rootFiles ) || checkUrlToLib( req_url, libFiles );
	if( !resultPath ) {
		return false;
	} else if ( resultPath === true ) {
		resultPath = req_url;
		return "." + resultPath;// from root dir '/' make current dir './'
	} else {
		return resultPath;
	}
};

function getContentType(fileExt, fileExtToContentType) {
	for( var fileToExt in fileExtToContentType ) {
		if (fileExt == fileToExt){
			return fileExtToContentType[fileToExt];
		}
	}
	return false;
}
function getFileExt(pathToFile) {
	var fileSplitted = pathToFile.split('.')
	return fileSplitted[fileSplitted.length - 1];
}
var serv = https.createServer(options, function ( req, res ) {
	var req_url = url.parse( req.url, true ); //true - parse query_string parameters, url.parse(..).query  - URL ?params object
	console.log("request to server: " + req);
	console.info("request to server: " + req);
	var reqPathToFile = getReqPathToFile(req_url.pathname, pathToFiles, lib);
	if (reqPathToFile) {
		fs.readFile(reqPathToFile, function (err, data) {
			if (err) {
				res.statusCode = 500; // internal server error
				res.end(error500);
			} else {
				var fileExt = getFileExt(reqPathToFile);
				var contType = getContentType(fileExt, fileExtToContentType);
				// when we specify some headers we also need as first argument put statusCode !!!!
				res.writeHead(200,{'Content-Type':contType, 'Access-Control-Allow-Origin': '*'});
				//it is important to understand that if text/plain will be setted browers will not
		//  render this as text/html, so to render it should be setup to text/html
		// js - {'Content-Type': 'application/xhtml+xml'};
		// json - {'Content-Type': 'application/json'}
				res.end(data);
			}
		});
	} else if ( tryToResolveURLAsCallToAPI( req_url, servicesAPI ) ) {
		//const postData = querystring.stringify({
			//'msg': 'Hello World!'
		//});
		const postData = '<?xml version="1.0" encoding="UTF-8"?>'+
			'<request version="1.0">'+
			'<merchant>'+
			'<id>75482</id>'+
			'<signature>ab871c9601cf28920c4c0ff63041ea585da9de89</signature>'+
			'</merchant>'+
			'<data>'+
			'<oper>cmt</oper>'+
			'<wait>0</wait>'+
			'<test>0</test>'+
			'<payment id="">'+
			'<prop name="cardnum" value="5168742060221193" />'+
			'<prop name="country" value="UA" />'+
			'</payment>'+
			'</data>'+
			'</request>';

		const options = {
			hostname: 'api.privatbank.ua',
			port: 443,
			path: '/p24api/balance',
			method: 'POST',
			headers: {
				'Content-Type': 'text/xml',
			},
			protocol: 'https:'
		};

		const reqFromServer = http.request(options, function (resOuterServer) {
			let data = '';
			resOuterServer.on('data', function (chunk) {
				data += chunk;
				console.log('BODY: ' + chunk);
			});
			resOuterServer.on('end', function () {
				console.log(data);
				res.writeHead(200,{'Content-Type': 'text/xml'});
				res.end(data);
			});
		});

		reqFromServer.on('error', function (error) {
			console.error('problem with request: ' + error.message);
		});

// Write data to request body
		reqFromServer.write(postData);
		reqFromServer.end();
	}
	/*switch (req_url.pathname) {
			case '/':
				fs.readFile('index.html', function (err, data) {
						if (err) {
							res.writeHead({'Content-Type':'text/html'});
							res.statusCode = 500; // internal server error
							res.end(error500);
						} else {
							res.statusCode = 200;
							res.end(data);
						}
				});
				break;*/
				//This method signals to the server that all of the response headers and body have been sent; that server should consider
	//this message complete. The method, response.end(), MUST be called on each response.
	//If data is specified, it is equivalent to calling response.write(data, encoding) followed by response.end(callback).
	//If callback is specified, it will be called when the response stream is finished.

	}).listen(8080, '127.0.0.22');
console.log(serv);

	//res.setHeader('Set-Cookie',cookie.serialize('name','vlas'));
	//let cookArr = req.headers.cookie.split('='); 
	//console.log(  /*cookArr[0] + ":" + */cookArr[1]);
