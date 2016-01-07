(function() {
  "use strict";

  angular.module("app").controller("deckFormCtrl", function($scope, $http) {
    window.$scope = $scope;

    $scope.formInitialize = function() {
      $http.get("/api/v1/formats.json").then(function(response){
        $scope.formats = response.data;
      });
    }
    $scope.selectArchetypes = function() {
      $http.get("/api/v1/archetypes.json?format_id=" + $scope.chosenFormat).then(function(response) {
        $scope.archetypes = response.data;
      });
    }

  });
}());