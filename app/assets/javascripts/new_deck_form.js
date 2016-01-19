(function() {
  "use strict";

  angular.module("app").controller("newDeckFormCtrl", function($scope, $http, $window) {
    window.$scope = $scope;

    $scope.formInitialize = function() {
      $http.get("/api/v1/formats.json").then(function(response){
        $scope.formats = response.data;
      });
      $scope.newDeckCards = [{},{},{}];
      $scope.totalQuantity = 0;
      $scope.newCard = {};
    }
    $scope.lookUpCard = function(input) {
      input.replace(/aet/g,"Æt").replace(/Aet/g,"Æt");
      $http.get("https://api.deckbrew.com/mtg/cards/typeahead?q=" + input).then(function(response){
        if (response.data[0]) {
          var cardEditions = response.data[0].editions;
          for (var i=cardEditions.length - 1;i>=0;i--) {
            if (parseInt(cardEditions[i].multiverse_id)) {
              $scope.foundCardImageURL = cardEditions[i].image_url
              break;
            }
          }
          $scope.foundCardName = response.data[0].name;
          $scope.searchedCards = response.data;
        } else {
          $scope.foundCardName = "";
          $scope.searchedCards = [];
          $scope.foundCArdImageURL = "";
        }
      });
    }
    $scope.selectArchetypes = function() {
      $http.get("/api/v1/archetypes.json?format_id=" + $scope.chosenFormat).then(function(response) {
        $scope.archetypes = response.data;
      });
    }
    $scope.addDeckCard = function(number) {
      for (var i=0;i<number;i++) {
        $scope.newDeckCards.push({key_card: false});
      }
    }
    $scope.removeDeckCard = function(number) {
      for (var i=0;i<number;i++) {
        $scope.newDeckCards.splice($scope.newDeckCards.length - 1, 1)
      }
    }
    $scope.addToTotalQuantity = function() {
      var total = 0;
      for(var i=0;i<$scope.newDeckCards.length;i++) {
        if (typeof $scope.newDeckCards[i].quantity === "number") {
          total += $scope.newDeckCards[i].quantity;
        }
      }
      $scope.totalQuantity = total;
    }
    $scope.postCard = function(newCard, index) {
      $http.post("/api/v1/deck_cards.json", newCard).then(function(response) {
        $scope.submitCards(response.data.deck_id, index + 1)
      });
    }
    $scope.getCardId = function(index) {
      $http.get("https://api.deckbrew.com/mtg/cards/typeahead?q=" + $scope.newDeckCards[index].name).then(function(response) {
      var cardEditions = response.data[0].editions;
      for (var i=cardEditions.length - 1;i>=0;i--) {
        if (parseInt(cardEditions[i].multiverse_id)) {
          var cardId = cardEditions[i].multiverse_id
          break;
        }
      }
      $scope.newDeckCards[index].card_id = cardId;
      $scope.postCard($scope.newDeckCards[index], index);
      });
    }
    $scope.submitCards = function(deckId, index) {
      if (index < $scope.newDeckCards.length) {
        $scope.newDeckCards[index].deck_id = deckId;
        $scope.getCardId(index);
      } else {
        $window.location.href = "/decks/" + deckId;
      }
    }
    $scope.submitDeck = function(userId) {
      if ($scope.foundCardName) {
        $scope.deckInfo.user_id = userId;
        $http.post("/api/v1/decks.json", $scope.deckInfo).then(function(deck) {
          $scope.submitCards(deck.data.id, 0);
        });
      }
    }
    $scope.removePrevious = function(index) {
      for (var i=0; i<$scope.newDeckCards.length; i++) {
        if (i !== index) {
          $scope.newDeckCards[i].key_card = false;
        }
      }
    }
    $scope.setCardName = function(index) {
      $http.get("https://api.deckbrew.com/mtg/cards/typeahead?q=" + $scope.newDeckCards[index].name).then(function(response){
        console.log()
        if (response.data[0]) {
          $scope.newDeckCards[index].name = response.data[0].name
        } else {
          $scope.newDeckCards[index].name = undefined;
        }
      });
    }
  });
}());