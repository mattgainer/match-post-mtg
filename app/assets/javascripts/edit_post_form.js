(function() {
  "use strict";

  angular.module("app").controller("editPostFormCtrl", function($scope, $http, $window) {
    window.$scope = $scope;
    $scope.formInitialize = function(postId) {
      $http.get("/api/v1/posts/" + postId + ".json").then(function(response) {
        $scope.post = response.data;
        $http.get("/api/v1/decks/" + $scope.post.deck_id + ".json").then(function(response){
          $scope.post.deck = response.data;
          $http.get("/api/v1/archetypes/" + $scope.post.archetype_id + ".json").then(function(response) {
            $scope.post.archetype = response.data;
            $http.get("/api/v1/results/" + $scope.post.result_id + ".json").then(function(response) {
              $scope.post.result = response.data;
            });
          });
        });
      });
    }
    $scope.lookUpCard = function(input) {
      input.replace(/aet/g,"Æt").replace(/Aet/g,"Æt");
      $http.get("https://api.deckbrew.com/mtg/cards/typeahead?q=" + input).then(function(response){
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
    $scope.selectArchetypes = function() {
      $http.get("/api/v1/decks/" + $scope.post.deck_id + ".json").then(function(deck) {
        $http.get("/api/v1/archetypes/" + deck.data.archetype_id + ".json").then(function(response) {
          var deckArchetype = response.data
          $http.get("/api/v1/archetypes.json?format_id=" + deckArchetype.format_id).then(function(response) {
            $scope.archetypes = response.data;
          });
        });
      });
    }
    $scope.submitPost = function() {
      $http.patch("/api/v1/posts/" + $scope.post.id + ".json", $scope.post).then(function(response) {
        $window.location.href = "/posts/" + $scope.post.id;
      });
    }
  });
}());