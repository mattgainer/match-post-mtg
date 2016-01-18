(function() {
  "use strict";

  angular.module("app", ['angular-clipboard']);
  angular.module('app').filter('newline', function($sce) {
    return function(text) {
        text = text.replace(/\n/g, '<br />');
        return $sce.trustAsHtml(text);
    }
  });
}());