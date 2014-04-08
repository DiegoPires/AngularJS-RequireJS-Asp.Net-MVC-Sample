// customDirectives
define(['app'], function (app) {
    var NUMBER_REGEX = /^\d+$/;
    app.register.directive('numberValidate', ['$timeout', '$log', function ($timeout, $log) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (NUMBER_REGEX.test(viewValue)) {
                        // it is valid
                        ctrl.$setValidity('number', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('number', false);
                        return undefined;
                    }
                });
            }
        };
    }]);
});
