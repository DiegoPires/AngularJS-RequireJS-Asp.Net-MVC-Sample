define(['spin'], function (Spinner) {

    var manualSpin = false;
    var spinner;

    var showSpinner = function () {
        $('#boxCarregando').show();

        var target = document.getElementById('boxCarregando');

        if (!spinner) {
            var opts = {
                lines: 11, // The number of lines to draw
                length: 11, // The length of each line
                width: 7, // The line thickness
                radius: 17, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 0, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: '#FFF', // #rgb or #rrggbb
                speed: 1, // Rounds per second
                trail: 50, // Afterglow percentage
                shadow: true, // Whether to render a shadow
                opacity: 1 / 4,
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: 'auto', // Top position relative to parent in px
                left: 'auto' // Left position relative to parent in px
            };

            spinner = new Spinner(opts).spin(target);
        } else {
            spinner.spin(target);
        }
    }

    var hideSpinner = function () {
        $('#boxCarregando').hide();

        if (spinner) {
            spinner.stop();
        }
    }

    var startLoading = function () {
        showSpinner();
        manualSpin = true;
    }

    var stopLoading = function () {
        hideSpinner();
        manualSpin = false;
    }

    var countRequest = 0;

    var interceptor = function ($q) {
        return {
            // optional method
            'request': function (config) {
                // do something on success
                if (config.url.indexOf('api') > -1) {
                    countRequest++;
                    if (countRequest == 1)
                        showSpinner();
                }

                return config || $q.when(config);
            },

            // optional method
            'requestError': function (rejection) {
                return $q.reject(rejection);
                //window.location.href = '/Erro/' + rejection.status;
            },

            // optional method
            'response': function (response) {
                if (response.config.url.indexOf("api") > -1) {
                    countRequest--;
                    if (countRequest == 0)
                        hideSpinner();
                }
                return response || $q.when(response);
            },

            // optional method
            'responseError': function (rejection) {
                countRequest = 0;
                hideSpinner();

                return $q.reject(rejection);
                //window.location.href = '/Erro/' + rejection.status;
            }
        };
    };

    return {
        showSpinner: showSpinner,
        hideSpinner: hideSpinner,
        startLoading: startLoading,
        stopLoading: stopLoading,
        interceptor: interceptor
    }

});