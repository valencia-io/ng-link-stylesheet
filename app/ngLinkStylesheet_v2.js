(function() {
  'use strict';
  angular
    .module('ngLinkStylesheet', [])
    .directive('ngLinkStylesheet', function() {
      return {
        restrict: 'A',
        //compile function is being executed once for scope (no matter if the directed is called twice or more)
        compile: function(element, attr) {


          return function(scope) {
            //link function is being executed every time the directive is called
            var linkClass = 'ngLinkStylesheet-' + attr.ngLinkStylesheet;
            var $head;

            //insert link if it's the first one or if allow-duplicates is an attribute
            var insertLink = attr.hasOwnProperty('ngLinkStylesheetAllowDuplicates') || document.getElementsByClassName(linkClass).length < 1;

            if (insertLink) {
              $head = angular.element(document).find('head');
              var linkId = 'ngLinkStylesheet-' + Date.now();
              var link = '<link id="' + linkId + '" class="' + linkClass + '" rel="stylesheet" href="' + attr.ngLinkStylesheet + '" type="text/css" media="screen">';
              $head.append(link);
              // remove link when the scope is detroyed if not has no-destroy attribute
              if (!attr.hasOwnProperty('ngLinkStylesheetNoDestroy')) {
                scope.$on('$destroy', function() {
                  console.log(linkId, ' linkId removed');
                  document.getElementById(linkId).remove();
                  // console.log(linkClass);
                  // console.log(angular.element(document).find('head').find('.' + linkClass));
                  // angular.element(document).find('head').find('.' + linkClass).remove();

                });
              }

            }
          };
        },
      };
    });
}());
