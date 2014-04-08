define(['app'], function (app) {
    app.register.factory('ContatoService', ['$http', '$q', '$log', function ($http, $q, $log) {
        return {
            carregarPesquisa: function () {
                var deferred = $q.defer();

                $http.get("/api/Contato/CarregarPesquisa").success(function (data) {
                    deferred.resolve(data);
                }).error(function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            },

            pesquisarContatos: function (idContato, idContatoContato, ativos) {
                var deferred = $q.defer();

                $http.get("/api/Contato/PesquisarContatoContato", {
                    params: {
                        Contato: idContato,
                        Contato: idContatoContato,
                        Ativos: ativos
                    }
                }).success(function (data) {
                    deferred.resolve(data);
                }).error(function (err) {
                    deferred.reject(err);
                });
                
                return deferred.promise;
            },

            carregarManter: function (idContato) {
                var deferred = $q.defer();

                $http.get("/api/Contato/CarregarManter", {
                    params: {
                        Contato: idContato
                    }
                }).success(function (data) {
                    deferred.resolve(data);
                }).error(function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            },

            salvar: function (Contato, contatos) {
                var deferred = $q.defer();

                $http.post("/api/Contato/Salvar", {
                        Contato: Contato,
                        Contatos: contatos
                }).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject(data);
                });

                return deferred.promise;
            }
        }
    }]);

});