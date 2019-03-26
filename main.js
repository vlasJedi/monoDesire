require.config({
	//baseUrl: "modules/scripts", //base entry point to find requested modules
	paths: {
		"jquery": "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min",  // !!! Require JS automotically adds .JS
		"returnName": "./scripts/returnName",
		"alertHello": "./scripts/alertHello",
		"moment":  "./node_modules/moment/min/moment-with-locales",
		"angular": "./node_modules/angular/angular",
		"ngModule1": "./scripts/ngModules/ngModule1"
	},
	//If no baseUrl is explicitly set in the configuration, the default value will be the location of 
	//the HTML page that loads require.js. If a data-main attribute is used, that path will become the baseUrl.
	shim: {
    //scripts that do not already call define(), so each .js file without define should be called in shim mode

		//Configure the dependencies, exports, and custom initialization for older, traditional
		// "browser globals" scripts that do not use define() to declare the dependencies and set a module value.

		// THIS IS VERY IMPORTANT
		// before setting angular to global export, it was not possible to load it here in requirejs section
		// so each angular module was not work properly, after exporting it angular starts properly loads
		// and also modules imports angular without specifying a path to the angular
		"angular": {
			'exports': 'angular'
		},
		"jquery": {
			"exports": 'jquery'
		},
		"moment": {
			'exports': 'moment'
		}

	},
	config: { // config for each modules, which adds through 'module'
		'returnName': {
			value: true
		}
	}
});
//define('modules/scripts/alertHello', function(alertHello) {
//	alert() hahahaha
//} );
require(["alertHello", "returnName", "ngModule1", "moment", "jquery"], function( alertHello, returnName, ngModule1, moment, $){
	// to use for example angular we need specify it in array of imported .js
		// bootstrap the app manually

	$(document).ready( function () {

		alertHello.sayHelloJquery();

        var simpleProm = new Promise(function(resolve,reject) {
        	window.navigator.geolocation.getCurrentPosition(function(location){resolve(location);}	
        	);
        });
        simpleProm.then(function(location){console.log(location)});
        /*var xhr = new XMLHttpRequest();
		//xhr.withCredentials = true;
		var request = {
			method: "GET",
			url: "https://my-json-server.typicode.com/vlasJedi/RestAPI", //Same Origin Policy - by default only possible access to prot://domain:port
			asynch: true,
			user: null,
			password: null
		}
		xhr.open(request.method,request.url,request.asynch,request.user,request.password);  // initializates request
		xhr.setRequestHeader("Access-Control-Allow-Origin","file:///C:/requireJS");
		xhr.send(); // is async by default, but can be sync  -- as argument can take next
		//xhr.status; // code
		//xhr.statusText; // text to code
		//xhr.responseText; // response text from server
		//xhr.responseXML; // response in XMl
		//xhr.abort;
		//var query = {
			//fname: "vlas",
			//sname: "dielov"
		//};
		//var URLqueryObj = new URLSearchParams();
		//for( var key in query ) {
			//URLqueryObj.set( key , query[key] );
		//}
		//console.log(URLqueryObj.toString());
		//xhr.send(URLqueryObj);
		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4 ) {
				console.log("Current readyState value is: " + xhr.readyState );
				return;
			}
			console.log("Server status code xhr.status: " + xhr.status + ", server status text: " + xhr.statusText );
			console.log("Response from server xhr.responseText: " + xhr.responseText);
			
		};*/
	});
} );