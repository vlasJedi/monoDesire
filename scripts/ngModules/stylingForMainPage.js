// define used for requirejs to define module it its scope
// first arg - array of dependencies
define(['angular','jquery'], function(angular, $) {
    // here defines angular module with distributed deps
    // from requirejs - angular, $
    // angular.module args - first is name of module, second array of deps from another modules
    // but these modules we load through requirejs, so it is empty arr
        var stylingForMainPage = angular.module('stylingForMainPage', []);
        stylingForMainPage.controller('styleMainPageBody', function($scope) {
            $scope.style = function () {
                var body = document.getElementsByTagName('body');
                body.style.backgroundColor = "black";
            }
        });
    }
);