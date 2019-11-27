define([], function() {
    return function() {
        return {
          restrict: "A",
          require: "ngModel",
          link: function(scope, element, attrs, modelCtrl) {
              console.log(`Ctrl with name: ${modelCtrl.$name} is linked`);
              function log(someFunc, template) {
                  return function(value) {
                      let res = someFunc(value);
                      console.log(template + " in: " + value + " out: " + res);
                      return res;
                  }
              }
              let upperCaseFirstLetter = function(string) {
                  console.log("Passing through upperCaseFirstLetter formatter");
                  return string.slice(0,1).toUpperCase() + string.slice(1);
              };
              modelCtrl.$formatters.push(log(upperCaseFirstLetter, "Result of formatter "));

              // render works to set final view value in each ctrl
              modelCtrl.$render = function() {
                  console.log("$render invoked, and $viewValue: " + modelCtrl.$viewValue + " $modelValue: " + modelCtrl.$modelValue);
                  element.val(modelCtrl.$viewValue);
                  console.log("Input value updated");
              }

              modelCtrl.$viewChangeListeners.push(function() {
                  console.log("$viewChangeListener is called, $viewValue: " + modelCtrl.$viewValue + " and $modelValue: " + modelCtrl.$modelValue);
              });
          }
        };
    }
});