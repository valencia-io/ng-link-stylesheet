(function() {
    'use strict';

    // Declare app level module which depends on views, and components
    var myApp = angular.module('myApp', [
        'ngRoute',
        'myApp.view1',
        'myApp.view2',
        'myApp.view3',
        'myApp.view4',
        'ngLinkStylesheet'
    ]);
    myApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/view1'
        });
    }])

})();
