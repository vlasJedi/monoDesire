require.config({
	//baseUrl: "modules/scripts", //base entry point to find requested modules
	paths: {
		//"jquery": "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min",  // !!! Require JS automotically adds .JS
		"xhr": "./app/utils/xhr",
		"angular": "./node_modules/angular/angular",
		"text": "./node_modules/text/text",
		"listForm": "./app/listForm/listForm",
		"formField": "./app/listForm/formField/formField"
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

		//if module is not AMD type and need some dependencies then it need to be specified here
		//only use shim config for non-AMD scripts,
		//scripts that do not already call define()
		//"bootstrap": ['jquery']
		"angular": {
			'exports': 'angular'
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
require(["listForm", "xhr"],
	function(displayTime, xhr) {
		// to use for example angular we need specify it in array of imported .js
		// bootstrap the app manually
		angular.element(document).ready(function () {

			angular.bootstrap(document.getElementById("listForm"),['listForm']);

			/*alert("Hello user: " + returnName.name() + returnName.isTrue);
            alertHello.sayHelloJquery();
            var dateFromUser = "26.06.1994";
            var parsingFormats = ["DD:MM:YYYY","YYYY:MM:DD","YYYY:MMM:DD"]; // it parser array which looks for matching, it parses all non alphabetic letters like seperator : and another such as * // / etc
            var locales = ["fr","en","us"];
            console.log("Date inputted by user is valid or not:"  + moment(dateFromUser,parsingFormats)._isValid);
            var moment_1 = moment(dateFromUser,parsingFormats,locales[0]);
            console.log("Locale is: " + moment_1._locale._abbr + " and date is: " + moment_1.format("DD + MMM + YYYY:hh+ZZ"));
            console.log("Locale is: " + moment_1._locale._abbr + " and date is: " + moment_1.format("LLLL"));
            var simpleProm = new Promise(function(resolve,reject) {
                window.navigator.geolocation.getCurrentPosition(function(location){resolve(location);}
                );
            });
            simpleProm.then(function(location){console.log(location)});*/
			/*var xhr = new XMLHttpRequest();
            });
            } );
             */
		});
	}
);