(function() {
  "use strict";

  angular.module("app").controller("newPostFormCtrl", function($scope, $http, $window) {
    window.$scope = $scope;

    $scope.formInitialize = function(userId) {
      $http.get("/api/v1/decks.json").then(function(response){
        $scope.userDecks = [];
        $scope.decks = response.data;
        for (var i=0;i<$scope.decks.length;i++) {
          if ($scope.decks[i].user_id === userId) {
            $scope.userDecks.push($scope.decks[i]);
          }
        }
      });
      $scope.newPost = {user_id: userId}
      $http.get("/api/v1/results.json").then(function(response) {
        $scope.results = response.data;
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
      $http.get("/api/v1/decks/" + $scope.newPost.deck_id + ".json").then(function(deck) {
        $http.get("/api/v1/archetypes/" + deck.data.archetype_id + ".json").then(function(response) {
          var deckArchetype = response.data
          $http.get("/api/v1/archetypes.json?format_id=" + deckArchetype.format_id).then(function(response) {
            $scope.archetypes = response.data;
          });
        });
      });
    }
    $scope.submitPost = function() {
      $http.post("/api/v1/posts.json", $scope.newPost).then(function(response) {
        $window.location.href = "/posts/" + response.data.id;
      });
    }
    $scope.testButton = function() {
    }
  });
}());