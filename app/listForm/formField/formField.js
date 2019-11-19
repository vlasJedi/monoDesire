define(["angular", "text!formField.html"], function(angular, formField) {
    return function () {
        return {
            template: formField,
            replace: true,
            require: "^listForm",
            scope: {
                modelSync: "=",
                onChange: "&"
            },
            link: function (scope, element, attrs, listFormCtrl) {

            }
        };
    };
});
