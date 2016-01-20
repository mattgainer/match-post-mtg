(function() {
  "use strict";

  angular.module("app").controller("editDeckFormCtrl", function($scope, $http, $window) {
    window.$scope = $scope;
    $scope.formInitialize = function(deckId) {
      $scope.totalQuantity = 0;
      $scope.newDeckCards = [];
      $http.get("/api/v1/decks/" + deckId + ".json").then(function(deck) {
        $scope.deck = deck.data;
        $http.get("/api/v1/archetypes/" + $scope.deck.archetype_id + ".json").then(function(archetype) {
          $scope.chosenFormat = archetype.data.format_id
          $http.get("/api/v1/formats.json").then(function(formats) {
            $scope.formats = formats.data
            for (var i=0; i<formats.data.length; i++) {
              if ($scope.chosenFormat === formats.data[i].id) {
                $scope.chosenFormat = formats.data[i];
              }
            }
          });
          $http.get("/api/v1/archetypes.json?format_id=" + archetype.data.format_id).then(function(archetypes) {
            $scope.archetypes = archetypes.data;
            for (var i=0; i < archetypes.data.length; i++) {
              if ($scope.deck.archetype_id === archetypes.data[i].id) {
                $scope.chosenArchetype = archetypes.data[i];
              }
            }
          });
          $http.get("/api/v1/formats.json").then(function(formats) {
            $scope.formats = formats.data
          });
        });
      });
      $http.get("/api/v1/deck_cards.json?deck_id=" + deckId).then(function(deck_cards) {
        $scope.oldDeckCards = deck_cards.data
        for (var i=0; i<$scope.oldDeckCards.length; i++) {
          $scope.lookUpCard($scope.oldDeckCards[i], i)
          $scope.totalQuantity += $scope.oldDeckCards[i].quantity;
        }
      });
    }
    $scope.addDeckCard = function(number) {
      for (var i=0;i<number;i++) {
        $scope.newDeckCards.push({key_card:false, deck_id:$scope.deck.id});
      }
      $scope.addToTotalQuantity();
    }
    $scope.removeDeckCard = function(number) {
      for (var i=0;i<number;i++) {
        $scope.newDeckCards.splice($scope.newDeckCards.length - 1, 1)
      }
      $scope.addToTotalQuantity();
    }
    $scope.lookUpCard = function(card, index) {
      $http.get("https://api.deckbrew.com/mtg/cards?m=" + card.card_id).then(function(response) {
        $scope.oldDeckCards[index].name = response.data[0].name;
      });
    }
    $scope.changeArchetype = function() {
      $scope.deck.archetype_id = $scope.chosenArchetype.id
    }
    $scope.submitDeck = function() {
      if ($scope.foundCardName || $scope.newDeckCards.length === 0) {
        $http.patch("/api/v1/decks/" + $scope.deck.id + ".json", $scope.deck).then(function(response) {
          $scope.editOldCards(0);
        });
      }
    }
    $scope.editOldCards = function(index) {
      $http.patch("/api/v1/deck_cards/" + $scope.oldDeckCards[index].id + ".json", $scope.oldDeckCards[index]).then(function(response) {
        if (index < $scope.oldDeckCards.length - 1) {
          $scope.editOldCards(index + 1);
        } else if ($scope.newDeckCards.length) {
          $scope.addNewCards(0);
        } else {
          $window.location.href = "/decks/" + $scope.deck.id;
        }
      });
    }
    $scope.addNewCards = function(index) {
      $http.post("/api/v1/deck_cards.json", $scope.newDeckCards[index]).then(function(response){
        if (index < $scope.newDeckCards.length - 1) {
          $scope.addNewCards(index + 1);
        } else {
          $window.location.href = "/decks/" + $scope.deck.id
        }
      });
    }
    $scope.addToTotalQuantity = function() {
      var total = 0;
      for(var i=0;i<$scope.newDeckCards.length;i++) {
        if (typeof $scope.newDeckCards[i].quantity === "number") {
          total += $scope.newDeckCards[i].quantity;
        }
      }
      for(var i=0;i<$scope.oldDeckCards.length;i++) {
        if (typeof $scope.oldDeckCards[i].quantity === "number") {
          total += $scope.oldDeckCards[i].quantity;
        }
      }
      $scope.totalQuantity = total;
    }
    $scope.lookUpCardByName = function(input) {
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
          $scope.foundCardId = cardEditions[i].multiverse_id;
        } else {
          $scope.foundCardName = "";
          $scope.searchedCards = [];
          $scope.foundCardImageURL = "";
        }
      });
    }
    $scope.toggleRemoved = function (index) {
      $scope.oldDeckCards[index].removed = !$scope.oldDeckCards[index].removed;
      if ($scope.oldDeckCards[index].key_card) {
        $scope.oldDeckCards[index].key_card = undefined;
      }
    }
    $scope.removePrevious = function(index, type) {
      if (type==="old") {
        for (var i=0; i<$scope.oldDeckCards.length; i++) {
          if (i !== index) {
            $scope.oldDeckCards[i].key_card = false;
          }
        }
        for (var i=0; i<$scope.newDeckCards.length;i++) {
          $scope.newDeckCards[i].key_card = false;
        }
      } else if (type==="new") {
        for (var i=0; i<$scope.oldDeckCards.length; i++) {
            $scope.oldDeckCards[i].key_card = false;
        }
        for (var i=0; i<$scope.newDeckCards.length;i++) {
          if (i !== index) {
            $scope.newDeckCards[i].key_card = false;
          }
        }
      }
    }
    $scope.setCardName = function(index) {
      $http.get("https://api.deckbrew.com/mtg/cards/typeahead?q=" + $scope.newDeckCards[index].name).then(function(response){
        console.log()
        if (response.data[0]) {
          var cardEditions = response.data[0].editions;
          for (var i=cardEditions.length - 1;i>=0;i--) {
            if (parseInt(cardEditions[i].multiverse_id)) {
              $scope.newDeckCards[index].card_id = cardEditions[i].multiverse_id
              break;
            }
          }
          $scope.newDeckCards[index].name = response.data[0].name
        } else {
          $scope.newDeckCards[index].name = undefined;
        }
      });
    }
  });
}());