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
                $scope.formFieldsDesc = [
                    {
                        formFieldCaption: "First Name",
                        formFieldTextDisplay: "Vlas"
                    },
                    {
                        formFieldCaption: "Second Name",
                        formFieldTextDisplay: "Dielov"
                    }
                ];
                this.handleClickOnFormField = function(formField) {
                    if ($scope.selectedFormField) {
                        $scope.selectedFormField.fieldTextDisplay = "not active";
                        $scope.selectedFormField.selected = false;
                        $scope.selectedFormField = formField;
                        $scope.selectedFormField.fieldTextDisplay = "active";
                        $scope.selectedFormField.selected = true;
                    } else {
                        $scope.selectedFormField = formField;
                        $scope.selectedFormField.fieldTextDisplay = "active";
                        $scope.selectedFormField.selected = true;
                    }
                };
                this.getModule = function() {return listForm};
            }]
        };
    });
});


