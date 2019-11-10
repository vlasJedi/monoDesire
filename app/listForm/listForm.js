//
define(['angular', "text!listForm.html", "text!formField.html"], function(angular, listFormHTML, formFieldHTML) {
    let listForm = angular.module('listForm', []);
    // Directive represents html representation of the module
    listForm.directive("listForm", function () {
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
    listForm.directive("formField", function () {
        return {
            template: formFieldHTML,
            replace: true,
            require: "^listForm",
            scope: {
                fieldCaption: "=",
                fieldTextDisplay: "=",
                selected: "="
            },
            link: function (scope, element, attrs, listFormCtrl) {
                element.on("click", function() {
                    listFormCtrl.handleClickOnFormField(scope);
                });
            }
        };
    });
    return listForm;
});


