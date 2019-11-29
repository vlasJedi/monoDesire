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
                  return angular.isString(string) && string.length > 1 ? string.slice(0,1).toUpperCase() + string.slice(1) : "";
              };
              let checkFirstLetterIsUpperCase = function(string) {
                  return angular.isString(string) && string.slice(0, 1).toUpperCase() === string[0];
              };
              modelCtrl.$formatters.push(log(upperCaseFirstLetter, "Result of formatter "));

              // render works to set final view value in each ctrl
              modelCtrl.$render = function() {
                  console.log("$render invoked, and $viewValue: " + modelCtrl.$viewValue + " $modelValue: " + modelCtrl.$modelValue);
                  element.val(modelCtrl.$viewValue);
                  console.log("Input value updated");
              };

              // after user input $parsers are called, then should $validators, and finally update of $modelValue,
              // but not backward flow to update then from $modelValue via $formatters the $viewValue
              // need manually
              modelCtrl.$parsers.push(function(string) {
                  console.log("$parser in: " + string + " $viewValue: " + modelCtrl.$viewValue + " $modelValue: " + modelCtrl.$modelValue);
                  if (!checkFirstLetterIsUpperCase(string)) {
                      let upperCased = upperCaseFirstLetter(string);
                      console.log(`uppercased to: ${upperCased}`);
                      return upperCased;
                  }
                  return string;
              });

              // these callbacks are called at last
              modelCtrl.$viewChangeListeners.push(function() {
                  console.log("$viewChangeListener is called, $viewValue: " + modelCtrl.$viewValue + " and $modelValue: " + modelCtrl.$modelValue);
                  // make $viewValue uppercased as $modelValue already does
                  if (!checkFirstLetterIsUpperCase(modelCtrl.$viewValue)) {
                      console.log("update $viewValue with upperCased");
                      modelCtrl.$setViewValue(modelCtrl.$modelValue);
                      modelCtrl.$render();
                  }
              });
          }
        };
    }
});