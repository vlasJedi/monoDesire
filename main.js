require.config({
	//baseUrl: "modules/scripts", //base entry point to find requested modules
	paths: {
		"jquery": "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min",  // !!! Require JS automotically adds .JS
		"returnName": "./scripts/returnName",
		"alertHello": "./scripts/alertHello",
		"xhr": "./scripts/xhr",
		"moment":  "./node_modules/moment/min/moment-with-locales",
		"angular": "./node_modules/angular/angular",
		"ngModule1": "./scripts/ngModules/ngModule1",
		"stylingForMainPage": "./scripts/ngModules/stylingForMainPage"
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
		},
		"xhr": {
			'exports': 'xhr'
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
require(["alertHello", "returnName", "ngModule1", "moment", "jquery", "xhr", "stylingForMainPage"],
	function( alertHello, returnName, ngModule1, moment, $, xhr, privatBankService){
	// to use for example angular we need specify it in array of imported .js
		// bootstrap the app manually

	$(document).ready( function () {

		alertHello.sayHelloJquery();

		/*
		var requestToWeater = xhr();
		requestToWeater.get('https://www.frankfurter.app/latest', {'Content-Type': 'application/json'},null,
			function(data) {
				console.log(data);
			},
			function () {
				console.log('error');
			});

		 */
	});
} );