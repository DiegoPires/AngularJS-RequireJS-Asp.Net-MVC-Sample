﻿// customDirectives
define(['app'], function (app) {
    app.register.directive('exemplo', ['$timeout', '$log', function ($timeout, $log) {
        return {
            restrict: 'A',
            //require: "^ngController",
            link: function (scope, elm, attr) {
                // Attempt to read the attribe from scope.  If not found, return what's pass to directive
                if (scope[attr.exemplo]) {
                    // ngWrite is found in scope.  Check if promised has been returned
                    var inval = scope[attr.exemplo];
                    if (inval.hasOwnProperty("then")) {
                        inval.then(function (data) {
                            elm.text(data);
                        });
                    } else {
                        elm.text(inval);
                    }
                } else {
                    elm.text(attr.exemplo);
                }
            }
        };
    }]);
});
