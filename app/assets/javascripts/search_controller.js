(function() {
  "use strict";

  angular.module("app").controller("searchCtrl", function($scope, $http, $window) {
    window.$scope = $scope;
    $scope.initializeSearch = function () {
      $scope.direction = false;
      $scope.orderAttribute = "updated_at"
      $scope.searchType = "post"
      $scope.mainDeck = true
      $http.get("/api/v1/decks/search.json").then(function(decks) {
        $scope.allDecks = decks.data;
        $scope.decks = $scope.allDecks;
        $http.get("/api/v1/posts/search.json").then(function(posts) {
          $scope.allPosts = posts.data;
          $scope.posts = $scope.allPosts;
          $http.get("/api/v1/formats.json").then(function(formats) {
            $scope.formats = formats.data;
          });
        });
      });
      $scope.search = {
        typeName: "post"
      };
    }
    $scope.goTo = function(type, id) {
      if (type === 'deck') {
        $window.location.href = "/decks/" + id
      }
      if (type === 'post') {
        $window.location.href = "/posts/" + id
      }
    }
    $scope.typeOfSearch = function(input, type) {
      if (type === "static") {
        return $scope.search.typeName === input;
      } else if (type === "dynamic") {
        return $scope.searchType === input;
      }
    }
      $scope.showChevron = function(direction, attribute) {
        return direction === $scope.direction && attribute === $scope.orderAttribute
      }
    $scope.newSearch = function() {
      $scope.orderAttribute = "updated_at"
      $scope.direction = true;
      var search = {
        typeName: $scope.searchType,
        format: $scope.chosenFormat,
        archetype: $scope.archetype_id,
        oppArchetype: $scope.opp_archetype_id,
        username: $scope.searchUser
      };
      $scope.search = angular.copy(search);
      if (search.typeName = 'post') {
        $scope.posts = [];
        var posts = angular.copy($scope.allPosts);
        for (var i = posts.length - 1; i>=0; i--) {
          if ((search.format && search.format !== posts[i].deck.archetype.format.id) ||
            (search.archetype && search.archetype !== posts[i].deck.archetype.id) ||
            (search.oppArchetype && search.oppArchetype !== posts[i].archetype.id) ||
            (search.username && search.username !== posts[i].deck.user.username)
            ) {
            posts.splice(i,1);
          }
        }
        $scope.posts = angular.copy(posts);
      }
      if (search.typeName = 'deck') {
        $scope.decks = [];
        var decks = angular.copy($scope.allDecks);
        for (var i = decks.length - 1; i>=0; i--) {
          if ((search.format && search.format !== decks[i].archetype.format.id) ||
            (search.archetype && search.archetype !== decks[i].archetype.id) ||
            (search.username && search.username !== decks[i].user.username)
            ) {
            decks.splice(i,1);
          }
        }
        $scope.decks = angular.copy(decks);
      }
    }
    $scope.toggleOrder = function(attribute) {
      if (attribute === $scope.orderAttribute) {
        $scope.direction = !$scope.direction;
      } else {
        $scope.direction === false;
      }
      $scope.orderAttribute = attribute
    }
    $scope.selectArchetypes = function() {
      $http.get("/api/v1/archetypes.json?format_id=" + $scope.chosenFormat).then(function(response) {
        $scope.archetypes = response.data;
      });
    }
    $scope.lookUpCard = function(input) {
      input.replace(/aet/g,"Æt").replace(/Aet/g,"Æt");
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
  });
}());