export default function() {
    return {
        setRequestParams: function(method, url, requestHeaders, urlSearchParams, body, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);

            function setRequestHeaders(xht, requestHeaders) {
                if (requestHeaders) {
                    for (var key in requestHeaders) {
                        if (requestHeaders.hasOwnProperty(key)) {
                            xhr.setRequestHeader(key, requestHeaders[key]);
                        }
                    }
                }
            };

            setRequestHeaders(xhr, requestHeaders);
            if (urlSearchParams) {
                var URLqueryObj = new URLSearchParams();
                for( var key in query ) {
                    //URLqueryObj.set( key , query[key] );
                }
            }


        },
        get: function (url, requestHeaders, urlSearchParams, callback) {
            this.setRequestParams("get", url, requestHeaders, urlSearchParams, null, callback);
        },
        post: function (url, requestHeaders, urlSearchParams, body, callback) {
            this.setRequestParams("post", url, requestHeaders, urlSearchParams, body, callback);
        }
        /*var xhr = new XMLHttpRequest();
		//xhr.withCredentials = true;
		var request = {
			method: "GET",
			url: "https://my-json-server.typicode.com/vlasJedi/RestAPI", //Same Origin Policy - by default only possible access to protocol://domain:port
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
    };
};