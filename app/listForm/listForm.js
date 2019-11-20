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
                        formFieldName: "fName",
                        formFieldCaption: "First Name",
                        formFieldTextDisplay: "Vlas",
                        formFieldVisibility: true
                    },
                    {
                        formFieldName: "sName",
                        formFieldCaption: "Second Name",
                        formFieldTextDisplay: "Dielov",
                        formFieldVisibility: true
                    }
                ];
                $scope.handle = {
                    onChangeFormField: function(textDisplay) {
                        console.log(textDisplay);
                    }
                };
            }],
            controllerAs: "listFormCtrl"
        };
    });
});


