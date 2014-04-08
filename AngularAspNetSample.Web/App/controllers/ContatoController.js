define(['app', 'jquery', 'underscore', 'moment', 'angular', 'services/ContatoService', 'ngload!select2', 'directives/select2'], function (app, $, _, moment, ng) {

    app.register.controller('ContatoController', ['$scope', '$window', '$routeParams', 'ContatoService', function ($scope, $window, $params, $service) {
        $scope.titulo = 'Pesquisar Contato';

        $scope.carregar = function () {
            //$service.carregarPesquisa().then(function (data) {
            //    $scope.Contatos = eval(data.Contatos);
            //});
        };

        $scope.alterarContato = function () {
            if ($scope.idContato) {
                $service.pesquisarContatos($scope.idContato).then(function (data) {
                    $scope.contatos = eval(data.contatos);
                });
            }
            else {
                $scope.contatos = null;
            }
            $scope.idContatoContato = null;
        };

        $scope.pesquisar = function () {
            $service.pesquisarContatos($scope.idContato, $scope.idContatoContato, $scope.ativos).then(function (data) {
                $scope.resultado = eval(data.contatos);
            });
        };

        $scope.editarContato = function (idContato) {
            window.location.href = '#/Contatos/' + idContato;
        };

        $scope.carregar();
    }]);
});
