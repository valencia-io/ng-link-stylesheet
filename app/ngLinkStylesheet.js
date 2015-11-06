(function() {
    'use strict';
    angular
        .module('ngLinkStylesheet', [])
        .directive('ngLinkStylesheet', [ function(baseUrl) {
            // executed only once when the directive is declareted
            var head = document.getElementsByTagName('head')[0];
            var links = {}; // status of the links added to head
            function compile(element, attr) {
                // Auto mode
                if (!attr.ngLinkStylesheet || attr.ngLinkStylesheet.toLowerCase() === 'auto') {
                    var baseUrl = '';
                    if (attr.ngLinkStylesheetBaseUrl) {
                        baseUrl = attr.ngLinkStylesheetBaseUrl;
                    }
                    if (attr.class) {
                        attr.ngLinkStylesheet = baseUrl + attr.class.split(' ')[0] + '.css';
                    } else {
                        console.log('No class found for ng-link-stylesheet');
                    }
                }

                var linkClass = 'ngLinkStylesheet-' + attr.ngLinkStylesheet;
                var linkId = 'ngLinkStylesheet-' + Date.now();

                var linkTemplate = document.createElement("link");
                linkTemplate.setAttribute("id", linkId);
                linkTemplate.setAttribute("rel", attr.rel || 'stylesheet');
                linkTemplate.setAttribute("type", attr.type || 'text/css');
                linkTemplate.setAttribute("href", attr.ngLinkStylesheet);
                linkTemplate.setAttribute("media", attr.media || 'all');
                linkTemplate.setAttribute("class", linkClass);

                //insert link if is the first one
                if (!links[linkClass] || !links[linkClass].added ) {
                    head.appendChild(linkTemplate);
                    links[linkClass] = {added : true};
                }

                // return directive link function to access the $scope
                return function($scope) {

                    // destroy link if doesn't have no-destroy attribute,
                    // and has been appended, and the listener hasn't been created yet
                    if (    links[linkClass]
                        &&  links[linkClass].added
                        && !links[linkClass].onDestoy
                        && !attr.hasOwnProperty('ngLinkStylesheetNoDestroy')) {

                        links[linkClass].onDestoy = true;
                        $scope.$on('$destroy', function() {
                            var element = document.getElementById(linkId);
                            if (element) {
                                element.remove();
                                links[linkClass] = {added : false, onDestoy: false};
                            }
                        });
                    }
                };
            };
            return {
                restrict: 'A',
                compile: compile,

            }
        }]);
}());
