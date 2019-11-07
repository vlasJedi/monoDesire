//
define(['angular', 'jquery', 'moment'], function( angular, $, moment ) {
        var ngModule1 = angular.module('ngModule1', []);
        var parsingFormats = ["DD:MM:YYYY","YYYY:MM:DD","YYYY:MMM:DD"];

        $('.jqueryChangeFont').css(['color', 'green']);

        // Controller defines scope for html elements with this module used
        ngModule1.controller('ngModule1Ctrl', function ($scope, $q, $timeout) {
            $scope.hidden = true;
            // some example of formats: LLLL - locales
            //$scope.formats = ["DD + MMM + YYYY:hh+ZZ", "LLLL"];
            //$scope.locales = ["fr","en","us"];
            $scope.momentCustomOutput = function (txtDate, dateParseFormat, dateCustomFormat, locale) {
                // it parser array which looks for matching, it parses all non alphabetic letters like seperator : and another such as * // / etc

                var moment_1 = moment(txtDate, dateParseFormat, locale);

                return moment_1.format(dateCustomFormat);
            };
            $scope.toggleVisibility = function() {
                $scope.hidden = !$scope.hidden;
            };
            $scope.momentISOoutput = function(txtDate, dateParseFormat, locale) {
                var moment_1 = moment(txtDate, dateParseFormat, locale);

                return moment_1.format();
            };
            $scope.momentRFCoutput = function(txtDate, dateParseFormat, locale) {
                var DATE_RFC2822 = "ddd, DD MMM YYYY HH:mm:ss Z";
                var moment_1 = moment(txtDate, dateParseFormat, locale);

                return moment_1.format(DATE_RFC2822);
            };
            /*(function() {
                var simpleProm = $q(function (resolve, reject) {
                    window.navigator.geolocation.getCurrentPosition(
                        function (location) {
                            resolve(location);
                        },
                        function ( error ) {
                            reject( error );
                        }
                    );
                });
                var secondPromiseValue;
                var firstProm = simpleProm
                    .then(function (location) {
                        $scope.promiseResult = location.coords.latitude + ", " + location.coords.longitude;
                        //return "First then resolved > transfer to second";
                    })
                    .then(function ( value ) {
                        if (value) {
                            $scope.promiseResult = value;
                        } else {
                            $scope.promiseResult = "nothing transferred";
                        }
                    })
                    .catch(function ( error ) {
                        $scope.promiseResult = "error occured: " + error.message;
                        throw new Error("first promise throw error in catch");
                    });
                var deferred = $q.defer();
                var secProm = deferred.promise;
                secProm.then( function () {secondPromiseValue = true;})
                $q.all([firstProm, secProm, null])
                    .then( function () {
                        $scope.promiseResult = "both promises resolved and is resolved second promise: " + secondPromiseValue;
                    })
                    .catch( function () {
                        $scope.promiseResult = "both promises: error catch and is resolved second promise: " + secondPromiseValue;
                    });
                $timeout(function () {
                    deferred.resolve("Second promise resolved > transfer to 1 then");
                }, 5000);

            })();
        });*/

        // Filters used in html expression to pipe | some txt
        angular.bootstrap(document.getElementsByClassName('entry-ng-module-1')[0],['ngModule1']);
        return ngModule1;
    });
    }
);