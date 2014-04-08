define(['app'], function (app) {
    app.register.factory('CalendarioService', ['$http', '$q', '$log', function ($http, $q, $log) {
        return {
            carregar: function () {
                var deferred = $q.defer();

                $http.get("/api/Calendario/Carregar").success(function (data) {
                    deferred.resolve(data);
                }).error(function () {
                    deferred.reject("An error occured while fetching items");
                });

                return deferred.promise;
            }
        }
    }]);

});