    export default function XHR() {
        return {
            setRequestParams: function (method, url, requestHeaders, urlQueryParams, body, callbackSuccess, callbackFault) {
                var xhr = new XMLHttpRequest();
                var urlQueryObj;
                //xhr.withCredentials = true;
                //xhr.timeout(time in ms);
                /*
                The XMLHttpRequest upload property returns an XMLHttpRequestUpload object that can be observed to
                monitor an upload's progress. It is an opaque object, but because it's also an XMLHttpRequestEventTarget,
                event listeners can be attached to track its process.
                 */
                //xhr.upload(data);

                /*
                var request = {
                    method: "GET",
                    url: "https://my-json-server.typicode.com/vlasJedi/RestAPI", //Same Origin Policy - by default only possible access to protocol://domain:port
                    asynch: true,
                    user: null,
                    password: null
                }
                xhr.open(request.method,request.url,request.asynch,request.user,request.password);  // initializates request
                 */

                xhr.open(method, url);

                //xhr.setRequestHeader("Access-Control-Allow-Origin","file:///C:/requireJS");

                if (requestHeaders) {
                    setRequestHeaders(xhr, requestHeaders);
                }

                if (urlQueryParams) {
                    urlQueryObj = getUrlObjectForSend(urlQueryParams);
                }

                switch (method) {
                    // xhr.send('string');
                    /*No, Blob URLs/Object URLs can only be made internally in the browser. You can make Blobs and get File
                        object via the File Reader API, although BLOB just means Binary Large OBject and is stored as
                        byte-arrays. A client can request the data to be sent as either ArrayBuffer or as a Blob.
                        The server should send the data as pure binary data. Databases often uses Blob to describe binary
                        objects as well, and in essence we are talking basically about byte-arrays.*/
                    // xhr.send(new Blob());
                    // xhr.send(new Int8Array());
                    // xhr.send({ form: 'data' });
                    // xhr.send(document);
                    case 'get':
                        xhr.send();
                        break;
                    case 'post':
                        xhr.send(body || urlQueryObj);
                        break;
                }

                //xhr.status; // code
                //
                //xhr.responseType - types:
                //" " treated as "text"
                // "document" - HTML or XML doc
                // "json"
                // "text"
                //xhr.readyState - types:
                // 0 - UNSENT - xhr instance created
                // 1 - OPENED - xhr.open() called
                // 2 - HEADERS_RECEIVED - xhr.send() called, received headers and status from server
                // 3 - LOADING - some partial data available
                // 4 - DONE - operation done

                //xhr.statusText; // text to code
                //xhr.responseText; // response text from server
                //xhr.responseXML; // response in XMl

                //xhr.abort;

                xhr.addEventListener('loadend', function () {
                    if (xhr.readyState === 4) {
                        callbackSuccess(xhr.response);
                        return;
                    }
                    callbackFault();
                });

                /**
                 * Set request's headers for xhr
                 *
                 * @param {object} xhr
                 * @param {object} requestHeaders -> with typeof <map> <headerName>: <headerValue>
                 * @return {void}
                 */
                function setRequestHeaders(xhr, requestHeaders) {
                    for (var requestHeader in requestHeaders) {
                        if (requestHeaders.hasOwnProperty(requestHeader)) {
                            xhr.setRequestHeader(requestHeader, requestHeaders[requestHeader]);
                        }
                    }
                };

                /**
                 * Uses embedded constructor for urlQuery < new urlSearchParams()> in JS
                 *
                 * @param {string || object} urlQueryParams -> string with params or object typeof <map>
                 * @return {URLSearchParams || undefined} constructed object
                 */
                function getUrlObjectForSend(urlQueryParams) {
                    var urlQueryObj;
                    switch (typeof (urlQueryParams)) {
                        case 'string':
                            urlQueryObj = new URLSearchParams(urlQueryParams);
                            break;
                        case 'object':
                            urlQueryObj = new URLSearchParams();
                            Object.keys(urlQueryParams).forEach(function (urlQueryParamKey) {
                                // set -> overrides old one param with new one
                                // append -> should simply add even already param exists

                                urlQueryObj.set(urlQueryParamKey, urlQueryParams[urlQueryParamKey]);
                            });
                            break;
                    }
                    return urlQueryObj;
                };

            },
            /**
             * Calls a GET method
             *
             * @param {string} url
             * @param {object || undefined || null} requestHeaders
             * @param {function} callbackSuccess -> success callback function to get result of request
             * @param {function} callbackFault -> fault callback function to get result of request
             * @return {object}
             */
            get: function (url, requestHeaders, callbackSuccess, callbackFault) {
                return this.setRequestParams("get", url, requestHeaders, null, null, callbackSuccess, callbackFault);
            },
            /**
             * Calls a POST method
             *
             * @param {string} url
             * @param {object || undefined || null} requestHeaders
             * @param {string || object} urlQueryParams -> sets in body when sends, but specific "body" like doc or string
             *                                              will override the urlQueryString
             * @param {document || string} body -> info to send
             * @param {function} callbackSuccess -> success callback function to get result of request
             * @param {function} callbackFault -> fault callback function to get result of request
             * @return {object}
             */
            post: function (url, requestHeaders, urlQueryParams, body, callbackSuccess, callbackFault) {
                return this.setRequestParams("post", url, requestHeaders, urlQueryParams, body, callbackSuccess, callbackFault);
            }
        }
    };