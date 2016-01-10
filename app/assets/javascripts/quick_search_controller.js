(function() {
  "use strict";

  angular.module("app").controller("quickSearchCtrl", function($scope, $http) {
    window.$scope = $scope;
    $scope.lookUpCard = function(input) {
      if (input.substring(0,3).toLowerCase() === "aet") {
        input = "Æt" + input.substring(3,input.length);
      }
      $http.get("http://api.deckbrew.com/mtg/cards/typeahead?q=" + input).then(function(response){
        var cardEditions = response.data[0].editions;
        for (var i=cardEditions.length - 1;i>=0;i--) {
          if (parseInt(cardEditions[i].multiverse_id)) {
            $scope.foundCardImageURL = cardEditions[i].image_url
            break;
          }
        }
        $scope.foundCardName = response.data[0].name;
        $scope.searchedCards = response.data;
      });
    }
    $scope.success = function () {
    };

    $scope.fail = function (err) {
        console.error('Error!', err);
    };


  });
}());