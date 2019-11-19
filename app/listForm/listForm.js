//
define(['angular', "text!listForm.html", "formField"], function(angular, listFormHTML, formField) {
    let listForm = angular.module('listForm', []);
    // inject formField
    listForm.directive("formField", formField);
    // Directive represents html representation of the module
    return listForm.directive("listForm", function () {
        return {
            template: listFormHTML,
            restrict: "E",
            replace: true,
            controller: ['$scope', function ($scope) {
                $scope.models = [
                    {
                        formFieldCaption: "First Name",
                        formFieldTextDisplay: "Vlas"
                    },
                    {
                        formFieldCaption: "Second Name",
                        formFieldTextDisplay: "Dielov"
                    }
                ];
                $scope.onChangeFormField = function(formFieldTextDisplay) {
                    console.log(formFieldTextDisplay);
                };
            }]
        };
    });
});


