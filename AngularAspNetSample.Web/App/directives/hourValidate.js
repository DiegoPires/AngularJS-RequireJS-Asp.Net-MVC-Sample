// customDirectives
define(['app'], function (app) {
    var HORA_REGEX = /^(20|21|22|23|[01]\d|\d)(([0-5]\d))$/;
    var HORA_REGEX_IE = /^(20|21|22|23|[01]\d|\d)(([:][0-5]\d))$/;

    app.register.directive('exemplo', ['$timeout', '$log', function ($timeout, $log) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (viewValue == '') {
                        if (HORA_REGEX.test(viewValue) || HORA_REGEX_IE.test(viewValue)) {
                            // it is valid
                            ctrl.$setValidity('hour', true);
                            return viewValue;
                        } else {
                            // it is invalid, return undefined (no model update)
                            ctrl.$setValidity('hour', false);
                            return undefined;
                        }
                    } else {
                        ctrl.$setValidity('hour', true);
                        return viewValue;
                    }
                });
            }
        };
    }]);
});
