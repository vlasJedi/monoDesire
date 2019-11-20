define(["angular", "text!formField.html"], function(angular, formField) {
    return function () {
        return {
            template: formField,
            replace: true,
            scope: {
                modelSync: "=",
                handle: "="
            },
            require: "^listForm",
            link: function (scope, element, attrs, listFormCtrl) {
            }
        };
    };
});
