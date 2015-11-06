// working in the link function
(function() {
    'use strict';
    angular
        .module('ngLinkStylesheet', [])
        .directive('ngLinkStylesheet', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    console.time('ng-link');
                    var linkClass = 'ngLinkStylesheet-' + attr.ngLinkStylesheet;
                    var linkId = 'ngLinkStylesheet-' + Date.now();
                    var rel = attr.rel || 'stylesheet';
                    var type = attr.type || 'text/css';
                    var media = attr.media || 'all';
                    var linkTemplate = '<link id="' + linkId
                                        + '" class="' + linkClass
                                        + '" rel="' + rel
                                        + '" href="' + attr.ngLinkStylesheet
                                        + '" type="' + type
                                        + '" media="' + media + '">';
                    var $head;
                    //insert link if it's the first one or if allow-duplicates is an attribute
                    var insertLink = attr.hasOwnProperty('ngLinkStylesheetAllowDuplicates') || document.getElementsByClassName(linkClass).length < 1;
                    if (insertLink) {
                        $head = angular.element(document).find('head');
                        $head.append(linkTemplate);
                    }
                    // destroy link if not has no-destroy attribute
                    if (insertLink && !attr.hasOwnProperty('ngLinkStylesheetNoDestroy')) {
                        scope.$on('$destroy', function() {
                            var element = document.getElementById(linkId);
                            if (element) {
                                element.remove();
                            }
                        });
                    }
                    console.timeEnd('ng-link');
                },
            };
        });
}());
