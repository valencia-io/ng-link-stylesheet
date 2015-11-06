/**
 **  PERFORMACE TEST
 **  Conclusion:
 **  The faster way is to have all the logic in the compile function,
 **  which is called only once when the scope is created,
 **  no matter how many times ng-link-stylesheet directive has been invoked.
 **  But to create the event listener to destroy the link we need to acces the scope through
 **  the link function (the return of the compile fn), which is called more than once. but we only
 **/

(function() {
    'use strict';
    angular
        .module('ngLinkStylesheet', [])
        .directive('ngLinkStylesheet', function() {
            // executed only once when the directive is declareted
            var head = document.getElementsByTagName('head')[0];
            var links = {}; // status of the links added to head
            function compile(element, attr) {
                var linkId = 'ngLinkStylesheet-' + Date.now();
                console.time('add ' + linkId);
                if (!attr.ngLinkStylesheet || attr.ngLinkStylesheet.toLowerCase() === 'auto') {
                    attr.ngLinkStylesheet = attr.class.split(' ')[0] + '.css';
                }
                var linkClass = 'ngLinkStylesheet-' + attr.ngLinkStylesheet;

                var linkTemplate = document.createElement("link");
                linkTemplate.setAttribute("id", linkId);
                linkTemplate.setAttribute("rel", attr.rel || 'stylesheet');
                linkTemplate.setAttribute("type", attr.type || 'text/css');
                linkTemplate.setAttribute("href", attr.ngLinkStylesheet);
                linkTemplate.setAttribute("media", attr.media || 'all');
                linkTemplate.setAttribute("class", linkClass);

                //insert link if is the first one
                if (!links[linkClass]) {
                    head.appendChild(linkTemplate);
                    links[linkClass] = {added : true};
                }

                console.timeEnd('add ' + linkId);
                // return directive link function to access the $scope
                return function($scope) {

                    // destroy link if doesn't have no-destroy attribute,
                    // and has been appended, and the listener hasn't been created yet
                    if (   links[linkClass]
                        && links[linkClass].added
                        && !links[linkClass].onDestoy
                        && !attr.hasOwnProperty('ngLinkStylesheetNoDestroy')) {

                        console.log('on detroy added');
                        console.count(linkId);
                        links[linkClass].onDestoy = true;
                        $scope.$on('$destroy', function() {
                            console.time('remove ' + linkId);
                            var element = document.getElementById(linkId);
                            if (element) {
                                element.remove();
                            }
                            console.timeEnd('remove ' + linkId);
                        });
                        console.log(links);

                    }


                };
            };
            return {
                restrict: 'A',
                compile: compile,
            };
        });
}());
