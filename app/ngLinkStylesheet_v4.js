(function() {
  'use strict';
  angular
    .module('ngLinkStylesheet', [])
    .directive('ngLinkStylesheet', function() {
      return {
        restrict: 'A',
        //compile function is being executed once for scope (no matter if the directed is called twice or more)
        compile: function(element, attr) {
          var linkClass = 'ngLinkStylesheet-' + attr.ngLinkStylesheet;
          var linkId = 'ngLinkStylesheet-' + Date.now();
          var link = '<link id="' + linkId + '" class="' + linkClass + '" rel="stylesheet" href="' + attr.ngLinkStylesheet + '" type="text/css" media="screen">'
          var $head;

          //insert link if it's the first one or if allow-duplicates is an attribute
          var insertLink = attr.hasOwnProperty('ngLinkStylesheetAllowDuplicates') || document.getElementsByClassName(linkClass).length < 1;

          if (insertLink) {
            $head = angular.element(document).find('head');
            $head.append(link);

          }

          // destroy link if not has no-destroy attribute
          var executeLinkFunction = true;
          if (insertLink && !attr.hasOwnProperty('ngLinkStylesheetNoDestroy')) {
            return function(scope) {
                //link function is being executed every time the directive is called and we only want to use it once
                if (executeLinkFunction) {
                  scope.$on('$destroy', function() {
                    document.getElementById(linkId).remove();
                    executeLinkFunction = false;
                  });
                }
              }
            }
        },
      };
    });
}());
