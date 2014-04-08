
require.config({

    baseUrl: "app",

    // alias libraries paths
    paths: {
        'angular': './../Scripts/angular',
        'angular-locale': './../Scripts/i18n/angular-locale_pt-br',
        'angular-route': './../Scripts/angular-route',
        'angular-animate': './../Scripts/angular-animate',
        'async': './../Scripts/async',
        'angularAMD': './../Scripts/angularAMD',
        'ngload': './../Scripts/ngload',
        'jquery': './../Scripts/jquery-1.10.2.min',
        'underscore': './../Scripts/underscore',
        'moment': './../Scripts/moment.min',
        'moment-pt-br': './../Scripts/lang/pt-BR',
        'select2': './../Scripts/select2',
        'spin': './../Scripts/spin',
        'bootstrap': './../Scripts/bootstrap',
        'calendar': './../Scripts/calendar',

        'datepicker': 'directives/bootstrap/datepicker/datepicker',
        'position': 'directives/bootstrap/position/position',

        'CalendarioController': 'controllers/CalendarioController',
        'ContatoController': 'controllers/ContatoController'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'angular-animate': ['angular'],
        'angular-locale': ['angular'],
        'underscore': { exports: '_' },
        'angular': {
            deps: ["underscore", "jquery"],
            exports: "angular"
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'datepicker': {
            deps: ['position', 'bootstrap', 'jquery']
        },
        'moment-pt-br': {
            deps : ['moment']
        },
        'select2': {
            deps: ["jquery"],
        }
    },

    // kick start application
    deps: ['app']
});
