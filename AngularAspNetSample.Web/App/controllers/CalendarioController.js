define(['app', 'jquery', 'underscore', 'moment', 'angular',
    'services/CalendarioService',
    'ngload!bootstrap', 'datepicker', 'calendar',
    'ngload!select2', 'directives/select2'], function (app, $, _, moment, ng) {

    app.register.controller('CalendarioController', ['$scope', '$window', '$routeParams', 'CalendarioService', 'MessageService', function ($scope, $window, $params, $service, $mService) {
        $scope.titulo = 'Calendário';

        $scope.carregar = function () {

            //$service.carregar().then(function (data) {
            $scope.entregas = []; // eval(data.entregas);
            $scope.calendar = []; // eval(data.calendar);

            //    $scope.diaMes = moment().format('D');
            //    $scope.diaSemana = moment().format('dddd');
                $scope.gerarCalendario();

        //    }, function (err) {
        //        // err
        //    });
        };

        $scope.gerarCalendario = function () {

            var options = {
                events_source: $scope.calendar,
                language: 'pt-BR',
                view: 'month',
                tmpl_path: 'tmpls/',
                tmpl_cache: false,
                day: 'now',
                onAfterEventsLoad: function (events) {

                    if (!events) {
                        return;
                    }
                    var list = $('#eventlist');
                    list.html('');

                    $.each(events, function (key, val) {
                        $(document.createElement('li'))
                            .html('<a href="' + val.url + '">' + val.title + '</a>')
                            .appendTo(list);
                    });

                },
                onAfterViewLoad: function (view) {

                    $('.page-header h3').text(this.getTitle());
                    $('.btn-group button').removeClass('active');
                    $('button[data-calendar-view="' + view + '"]').addClass('active');

                },
                classes: {
                    months: {
                        general: 'label'
                    }
                }
            };

            var calendar = $('#calendar').calendar(options);

            $('.btn-group button[data-calendar-nav]').each(function () {
                var $this = $(this);
                $this.click(function () {
                    calendar.navigate($this.data('calendar-nav'));
                });
            });

            $('.btn-group button[data-calendar-view]').each(function () {
                var $this = $(this);
                $this.click(function () {
                    calendar.view($this.data('calendar-view'));
                });
            });

            $('#first_day').change(function () {
                var value = $(this).val();
                value = value.length ? parseInt(value) : null;
                calendar.setOptions({ first_day: value });
                calendar.view();
            });

            
        };

        $scope.carregar();

    }]);

});
