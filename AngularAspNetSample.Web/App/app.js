define(['angularAMD', 'angular-route', 'angular-animate', 'angular-locale', 'jquery', 'util', 'moment', 'moment-pt-br'], function (angularAMD, route, animate, locale, $, util) {
    var app = angular.module("app", ['ngRoute', 'ngAnimate']);

    /**
     * Configure Angular ngApp with route and cache the needed providers
     */
    app.config(function ($routeProvider) {

        $routeProvider
            .when("/calendario", angularAMD.route({
                templateUrl: '../../Calendario', controller: 'CalendarioController', section: 'Calendário', title: 'Calendário'
            }))
            .when("/contatos", angularAMD.route({
                templateUrl: '../../Contatos', controller: 'ContatoController', section: 'Pesquisa', title: 'Contato'
            }))
            .when("/contatos/:contatoId", angularAMD.route({
                templateUrl: '../../Contatos/Manter', controller: 'ContatoController', section: 'Cadastro', title: 'Contato'
            }))
            .otherwise({ redirectTo: '/calendario' })
    });

    //directives globais
    app.directive('navMenu', function ($location) {
        var link = function (scope, element, attrs) {
            var links = element.find('a'),
                onClass = attrs.navMenu || 'menu-ativo',
                routePattern,
                link,
                url,
                currentLink,
                urlMap = {},
                i;

            if (!$location.$$html5) {
                routePattern = /^#[^/]*/;
            }

            for (i = 0; i < links.length; i++) {
                link = angular.element(links[i]);
                url = link.attr('href');

                if ($location.$$html5) {
                    urlMap[url] = link;
                } else {
                    urlMap[url.replace(routePattern, '')] = link;
                }
            }

            function setaRota()
            {
                var pathLink = urlMap[$location.path()];

                if (pathLink) {
                    if (currentLink) {
                        currentLink.parent().removeClass(onClass);
                    }
                    if (pathLink.attr("href") !== "#") {
                        currentLink = pathLink;
                        currentLink.parent().addClass(onClass);
                    }
                }
            }

            scope.$on('$routeChangeStart', function () {
                setaRota();
            });

            setaRota();
        };

        var ctrl = ['$scope', '$route', '$window', '$location', function ($scope, $route, $window, $location) { }]

        return {
            restrict: 'A',
            controller: ctrl,
            templateUrl: 'app/directives/templates/navMenu.html',
            link: link
        };
    });

    app.directive('navBreadcrumbs', function ($log) {

        var tmp = '<ol class="breadcrumb">' +
                    '<li><a href="#/">Home</a></li>' +
                    '<li ng-repeat=\'bc in breadcrumbs\' ng-class="{\'active\': {{$last}} }">' +
                        '{{bc.label}}' +
                    '</li>' +
                   '</ol>';

        var ctrl = ['$scope', '$route', '$window', '$location', function ($scope, $route, $window, $location) {
            $scope.$on('$routeChangeSuccess', function (next, current) {
                $scope.breadcrumbs = [];
                var rota = current.$$route

                if (rota != undefined) {
                    if (rota.section != rota.title)
                        $scope.breadcrumbs.push({ label: rota.section });
                    $scope.breadcrumbs.push({ label: rota.title });
                }
                $scope.$broadcast('messageHide');
            });
        }];

        return {
            restrict: 'A',
            controller: ctrl,
            template: tmp,
            replace: true
        };
    });

    app.directive('navUsuario', function ($log) {

        var tmp = ' <div class="btn-group-sm"> ' +
                        '<button type="button" class="btn btn-default dropdown-toggle">' +
                            '<i class="fa fa-user"></i> {{nomeUsuario}}' +
                        '</button>' +
                    '</div>';

        var ctrl = ['$scope', '$http', function ($scope, $http) {

            $http.get("/api/Usuario/AuthorizedUser").success(function (data) {
                $scope.nomeUsuario = JSON.parse(data.usuario).Name;
            });

        }];

        return {
            restrict: 'A',
            controller: ctrl,
            template: tmp,
            replace: true
        };
    });

    app.directive('navTitle', function ($log) {

        var tmp = '<h1 class="h1-titulo"><i class="fa {{classeTitulo}}"></i> {{titulo}}</h1>';

        var ctrl = ['$scope', '$route', '$window', '$location', function ($scope, $route, $window, $location) {
            $scope.$on('$routeChangeSuccess', function (next, current) {
                var rota = current.$$route

                if (rota != undefined) {
                    if (rota.section == "Pesquisa")
                        $scope.classeTitulo = "fa-search"
                    else
                        $scope.classeTitulo = "fa-pencil-square-o"

                    if (rota.section != rota.title)
                        $scope.titulo = rota.section + ' de ' + rota.title;
                    else
                        $scope.titulo = rota.section;
                }
            });
        }];

        return {
            restrict: 'A',
            controller: ctrl,
            template: tmp,
            replace: true
        };
    });

    app.factory('permissions', function ($rootScope) {
        var permissionList;
        return {
            setPermissions: function (permissions) {
                permissionList = permissions;
                $rootScope.$broadcast('permissionsChanged')
            },
            hasPermission: function (permissions) {
                var ps = permissions.split(",");
                var hasP = false;
                for (var i = 0; i < ps.length; i++) {
                    if (permissionList[ps[i]] !== undefined)
                        return true;
                }

                return false;
            }
        };
    });

    app.factory('MessageService', ['$http', '$q', '$log', '$rootScope', function ($http, $q, $log, $rootScope) {

        var servicoMensagem = {};
        servicoMensagem.mensagem = '';

        servicoMensagem.displaySuccess = function (msg, titulo, fnc) {
            this.display(msg, "Sucesso!", "alert alert-success");
        };
        servicoMensagem.displayError = function (msg, titulo, fnc) {
            this.display(msg, "Ops!", "alert alert-danger");
        };
        servicoMensagem.displayAlert = function (msg, titulo, fnc) {
            this.display(msg, "Atenção.", "alert alert-warning");
        };

        servicoMensagem.hide = function () {
            $rootScope.$broadcast('messageHide');
        };

        servicoMensagem.display = function (msg, titulo, classe) {
            this.mensagem = msg;
            this.classeModal = classe;
            this.titulo = titulo;
            this.broadcastItem();
        };

        servicoMensagem.broadcastItem = function () {
            $rootScope.$broadcast('messageSent');
        };

        return servicoMensagem;
    }])

    app.directive('navMensagem', ['$timeout', '$log', 'MessageService', function ($timeout, $log, $mService) {
        var tmp = '<article class="agrupamento" ng-show="modal.show">' +
                        '<div class="campo-24">' +
                            '<div class="alert {{modal.classeModal}}">' +
                                '<button type="button" class="close" ng-click="fechar()">×</button>' +
                                '<strong>{{modal.titulo}}</strong> {{modal.mensagem}}' +                            
                            '</div>' +
                        '</div>' +
                    '</artible>';

        var ctrl = ['$scope', '$route', '$window', '$location', function ($scope, $route, $window, $location) {

            $scope.modal = { "show": false, "mensagem": "", "classeModal": "" };

            $scope.fechar = function () {
                $scope.modal.show = false;
            };

            $scope.$on('messageHide', function(){
                $scope.modal.show = false;
            });

            $scope.$on('messageSent', function () {
                $scope.modal.show = true;
                $scope.modal.titulo = $mService.titulo;
                $scope.modal.classeModal = $mService.classeModal;
                $scope.modal.mensagem = $mService.mensagem;
            });
        }];

        return {
            restrict: 'A',
            controller: ctrl,
            template: tmp,
            replace: true
        };
    }]);

    app.directive('hasPermission', function (permissions) {
        return {
            link: function (scope, element, attrs) {
                var value = attrs.hasPermission.trim();

                function toggleVisibilityBasedOnPermission() {
                    var hasPermission = permissions.hasPermission(value);

                    if (hasPermission)
                        element.show();
                    else
                        element.hide();
                }
                toggleVisibilityBasedOnPermission();
                scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
            }
        };
    });

    /** CONFIGS
    ***********************************************************************************/
    

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push(util.interceptor);
    });

    app.run(function (permissions) {
        permissions.setPermissions(permissionList)
    });

    var permissionList;
    //$.get('/api/Usuario/GetPermissions', function (data) {
    //    permissionList = JSON.parse(data.permissoes);
        angularAMD.bootstrap(app);
    //});

    return app;
});
