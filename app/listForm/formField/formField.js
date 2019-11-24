define(["angular", "text!formField.html"], function(angular, formField) {
    return function () {
        return {
            template: formField,
            scope: {
                modelSync: "=",
                onChange: "&",
                caption: "=",
                ngModel: "=",
                ngRequired: "@",
                pattern: "="
            },
            // specify directive to require
            require: ["^form", "^listForm", "ngModel"], // to get form ctrl is default require with ^form
            link: function(scope, element, attrs, formCtrls) {
                let formCtrl = formCtrls[0];
                let mainCtrl = formCtrls[1];
                let thisInput = formCtrls[2];
                element.on("click", function() {
                   mainCtrl.notifyFormCtrl({element: scope, event: "click"});
                });
            }
        };
    };
});
