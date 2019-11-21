define(["angular", "text!formField.html"], function(angular, formField) {
    return function () {
        return {
            template: formField,
            replace: true,
            scope: {
                modelSync: "=",
                handle: "=",
                name: "@"
            },
            require: "^form",
            link: function(scope, element, attrs, formCtrl) {

            }
        };
    };
});
