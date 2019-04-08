//
define(['angular', 'jquery', 'moment'], function( angular, $, moment ) {
        var ngModule1 = angular.module('ngModule1', []);
        var parsingFormats = ["DD:MM:YYYY","YYYY:MM:DD","YYYY:MMM:DD"];

        $('.jqueryChangeFont').css(['color', 'green']);

        // Controller defines scope for html elements with this module used
        ngModule1.controller('ngModule1Ctrl', function ($scope) {
            $scope.hidden = false;
            // some example of formats: LLLL - locales
            //$scope.formats = ["DD + MMM + YYYY:hh+ZZ", "LLLL"];
            //$scope.locales = ["fr","en","us"];
            $scope.momentCustomOutput = function (txtDate, dateParseFormat, dateCustomFormat, locale) {
                // it parser array which looks for matching, it parses all non alphabetic letters like seperator : and another such as * // / etc

                var moment_1 = moment(txtDate, dateParseFormat, locale);

                return moment_1.format(dateCustomFormat);
            };
            $scope.callDigest = function() {
                $scope.$digest();
            };
            $scope.toggleVisibility = function() {
                $scope.hidden = !$scope.hidden;
            };
            //$scope.$watch('hidden',)
            $scope.toggleVisibility = function () {
                $scope.hidden=!$scope.hidden;
            };
        });

        // Filters used in html expression to pipe | some txt
        return ngModule1;
    }
);