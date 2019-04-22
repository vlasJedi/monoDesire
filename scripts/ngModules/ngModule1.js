//
define(['angular', 'jquery', 'moment'], function( angular, $, moment ) {
        var ngModule1 = angular.module('ngModule1', []);
        var parsingFormats = ["DD:MM:YYYY","YYYY:MM:DD","YYYY:MMM:DD"];

        $('.jqueryChangeFont').css(['color', 'green']);

        // Controller defines scope for html elements with this module used
        ngModule1.controller('ngModule1Ctrl', function ($scope) {
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

                return "ISO8601 format: " + moment_1.format();
            };
            $scope.momentRFCoutput = function(txtDate, dateParseFormat, locale) {
                var DATE_RFC2822 = "ddd, DD MMM YYYY HH:mm:ss Z";
                var moment_1 = moment(txtDate, dateParseFormat, locale);

                return "RFC2822 format: " + moment_1.format(DATE_RFC2822);
            };
        });

        // Filters used in html expression to pipe | some txt
        angular.bootstrap(document.getElementsByClassName('entry-ng-module-1')[0],['ngModule1']);
        return ngModule1;
    }
);