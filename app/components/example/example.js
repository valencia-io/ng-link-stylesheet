(function() {
    'use strict';
    angular
        .module('myApp')
        .directive('example', function() {
            return {
                restrict: 'AE',
                templateUrl: 'components/example/example.html',
                link: function(scope, element, attr) {
                        // console.log(scope);
                },
            };
        });
}());
