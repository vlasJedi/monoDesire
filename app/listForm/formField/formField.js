define(["angular", "text!formField.html"], function(angular, formField) {
    return function () {
        return {
            template: formField,
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
    };
});
