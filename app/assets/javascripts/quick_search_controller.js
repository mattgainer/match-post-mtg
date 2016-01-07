(function() {
  "use strict";

  angular.module("app").controller("quickSearchCtrl", function($scope, $http) {
    window.$scope = $scope;
    // Using ng-change
    $scope.lookUpCard = function(input) {
      $http.get("http://api.deckbrew.com/mtg/cards/typeahead?q=" + input).then(function(response){
        $scope.foundCardImageURL = response.data[0].editions[response.data[0].editions.length - 1].image_url
        $scope.foundCardName = response.data[0].name
      });
    }
    $scope.addCardToClipboard = function() {
      $scope.foundCardName
    };
    $scope.success = function () {
    };

    $scope.fail = function (err) {
        console.error('Error!', err);
    };


  });
}());