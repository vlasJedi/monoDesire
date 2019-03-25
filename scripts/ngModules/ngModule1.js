var ngModule1 = angular.module('ngModule1',[]);
ngModule1.controller( 'mgModel1Ctrl', function( $scope ) {
    $scope.someValue = 'some%Value%';
});
ngModule1.filter('deletePercents', function () {
    return function (txt) {
        return txt.replace(/%/, '');
    }
});