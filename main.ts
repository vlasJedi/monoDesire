    import * as angular from "angular";
    import xhr from "./app/utils/xhr";
    import formField from "./app/registrationForm/formField/formField";
    import registrationForm from "./app/registrationForm/registrationForm";
    
(function() {
    angular.element(document).ready(function () {
        let listForm = angular.module('registrationForm', []);
        // inject formField
        listForm.directive("formField", formField);

        // Directive represents html representation of the module
        listForm.directive("registrationForm", registrationForm);
        angular.bootstrap(document.getElementById("registrationForm"), ['registrationForm']);
    });
})();