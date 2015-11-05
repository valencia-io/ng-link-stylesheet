/*
*  This version use the compile function which is more fast, but it is only being executed one for scope.
*  Which means than is the directive ng-link-stylesheet is used within a ng-repeat directive it will be executed only once.
*/
(function() {
  'use strict';
  angular
    .module('ngLinkStylesheet', [])
    .directive('ngLinkStylesheet', function() {
      return {
        restrict: 'A',
        compile: function(element, attr) {
          var _class = 'ngLinkStylesheet-' + attr.ngLinkStylesheet;
          var $head;
          // not in use now
          //var _id = 'ngLinkStylesheet-' + Date().now();

          //insert link if it's the first one or if allow-duplicates is an attribute
          var _allowLink = attr.hasOwnProperty('ngLinkStylesheetAllowDuplicates') || document.getElementsByClassName(_class).length < 1;
          if (_allowLink) {
            $head = angular.element(document).find('head');
            $head.append('<link class="' + _class + '" rel="stylesheet" href="' + attr.ngLinkStylesheet + '" type="text/css" media="screen">');

          }

          // destroy link if it was created but not destroy it if no-destroy is an attribute
          if (_allowLink && !attr.hasOwnProperty('ngLinkStylesheetNoDestroy')) {
            return function(scope) {
              scope.$on('$destroy', function() {
                document.getElementsByClassName(_class)[0].remove();
              });
            }
          }

        },
      };
    });
}());
