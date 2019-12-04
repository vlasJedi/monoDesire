//
define(['angular', "text!registrationForm.html", "formField"], function(angular, registrationFormHTML, formField) {
    let listForm = angular.module('registrationForm', []);
    // inject formField
    listForm.directive("formField", formField);

    // Directive represents html representation of the module
    return listForm.directive("registrationForm", function () {
        return {
            template: registrationFormHTML,
            restrict: "E",
            // defines controller which can be accessed by scope props
            // but also with this. methods which can be accessed when some child directive
            // will need use parent shared ctrl to inter with others
            controller: function ($scope, $element, $attrs) {
                // this is accessible via require the directive
                this.notifyFormCtrl = function (elementUpdate) {
                    console.log(`Input field with name: ${elementUpdate.element.modelSync.formFieldName} + has such event: ${elementUpdate.event}`);
                };
                this.getFormFieldName = function(index) {
                    return $scope.models[index].formFieldName;
                };
                $scope.models = [
                    {
                        formFieldName: "fName",
                        formFieldCaption: "First Name",
                        formFieldTextDisplay: "",
                        formFieldVisibility: true
                    },
                    {
                        formFieldName: "sName",
                        formFieldCaption: "Second Name",
                        formFieldTextDisplay: "",
                        formFieldVisibility: true
                    }
                ];
                $scope.handle = {
                    onChangeFormField: function (textDisplay, name) {
                        console.log(`Form field input value has changed due to user interaction to: ${textDisplay}`);
                        // VERY IMPORTANT ! HERE IS AVAILABLE FORM CTRL
                        let input = $scope.registrationForm[name];
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
            },
            // ctrl this. can be accessed via controllerAs value in the directive,
            //
            controllerAs: "registrationFormCtrl"
        };
    });
});


