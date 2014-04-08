define(['app'], function (app) {
    app.register.factory('MessageService', ['$http', '$q', '$log', '$rootScope', function ($http, $q, $log, $rootScope) {

        var servicoMensagem = {};

        servicoMensagem.mensagem = '';

        servicoMensagem.displayConfirm = function (msg, fnc) {
            this.display(msg, fnc, "confirmacao", "modalPergunta");
        };

        servicoMensagem.displaySuccess = function (msg, fnc) {
            this.display(msg, fnc, "sucesso", "modalSucesso");
        };
        servicoMensagem.displayError = function (msg, fnc) {
            this.display(msg, fnc, "erro", "modalErro");
        };
        servicoMensagem.displayAlert = function (msg, fnc) {
            this.display(msg, fnc, "alerta", "modalAlertaMsg");
        };

        servicoMensagem.display = function (msg, fnc, tipo, classe) {
            this.mensagem = msg;
            this.tipoMensagem = tipo;
            this.fnc = fnc;
            this.classeModal = classe;
            this.broadcastItem();
        };

        servicoMensagem.broadcastItem = function () {
            $rootScope.$broadcast('messageSent');
        };

        return servicoMensagem;
    }])
});