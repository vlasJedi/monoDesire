//
define(['angular', "text!listForm.html", "formField"], function(angular, listFormHTML, formField) {
    let listForm = angular.module('listForm', []);
    // inject formField
    listForm.directive("formField", formField);
    listForm.controller("MainFormCtrl", ["$scope", function($scope) {
        $scope.models = [
            {
                formFieldName: "fName",
                formFieldCaption: "First Name",
                formFieldTextDisplay: "vlas",
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
            onChangeFormField: function(textDisplay, name) {
                console.log(`Form field input value has changed due to user interaction to: ${textDisplay}`);
                // VERY IMPORTANT ! HERE IS AVAILABLE FORM CTRL
                let input = $scope.rootListForm[name];
                console.log(`Input ${input.$name} has $viewValue: ${input.$viewValue}`);
                console.log(`Input ${input.$name} has $modelValue: ${input.$modelValue}`);
                console.log(`Input ${input.$name} has $invalid: ${input.$invalid}`);
                console.log(`Input ${input.$name} has $touched: ${input.$touched}`);
                console.log(`Input ${input.$name} has $dirty: ${input.$dirty}`);
                console.log(`Input ${input.$name} has $pristine: ${input.$pristine}`);
                console.log(`Input ${input.$name} has $valid: ${input.$valid}`);
                console.log(`Input ${input.$name} has $untouched: ${input.$untouched}`);
                console.log(`Input ${input.$name} has $pending: ${input.$pending}`);



            }
        };
    }]);
    // Directive represents html representation of the module
    return listForm.directive("listForm", function () {
        return {
            template: listFormHTML,
            restrict: "E",
            // defines controller which can be accessed by scope props
            // but also with this. methods which can be accessed when some child directive
            // will need use parent shared ctrl to inter with others
            controller: function ($scope, $element, $attrs) {
                // this is accessible via require the directive
                this.notifyFormCtrl = function(elementUpdate) {
                    console.log(`Input field with name: ${elementUpdate.element.modelSync.formFieldName} + has such event: ${elementUpdate.event}`);
                }
            },
            // ctrl this. can be accessed via controllerAs value in the directive,
            //
            controllerAs: "mainCtrl"
        };
    });
});


