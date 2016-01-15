(function() {
  "use strict";

  angular.module("app").controller("searchCtrl", function($scope, $http, $window, $location) {
    window.$scope = $scope;
    window.$location = $location;
    $scope.initializeSearch = function () {
      $scope.numberOfRecords = 10;
      $scope.locationParams = angular.copy($location.search())
      $scope.search = {numberOfRecords: $scope.numberOfRecords};
      if ($scope.locationParams["type"]) {
        $scope.search.typeName = $scope.locationParams["type"];
        $scope.searchType = $scope.locationParams["type"];
      } else {
        $scope.search.typeName = "post";
        $scope.searchType = "post";
      }
      if ($scope.locationParams.format) {
        $scope.search.format = parseInt($scope.locationParams.format);
        $http.get("/api/v1/formats/" + $scope.locationParams.format + ".json").then(function(format) {
          $scope.chosenFormat = format.data;
          $scope.selectArchetypes();
          if ($scope.locationParams.archetype) {
            $scope.search.archetype = parseInt($scope.locationParams.archetype);
            $http.get("/api/v1/archetypes/" + $scope.locationParams.archetype + ".json").then(function(archetype) {
            $scope.chosenArchetype = archetype.data;
            });
          }
          if ($scope.locationParams.opp_archetype) {
            $scope.search.oppArchetype = parseInt($scope.locationParams.opp_archetype);
            $http.get("/api/v1/archetypes/" + $scope.locationParams.opp_archetype + ".json").then(function(archetype) {
              $scope.chosenOppArchetype = archetype.data;
            });
          }
        });
      }
      if ($scope.locationParams.username) {
        $scope.search.username = $scope.locationParams.username;
        $scope.searchUser = $scope.locationParams.username;
      }
      $scope.paginationOptions = [10,25,50,100]
      $scope.direction = false;
      $scope.orderAttribute = "updated_at"
      $scope.mainDeck = true
      $scope.startingIndex = 0;
      $http.get("/api/v1/decks/search.json").then(function(decks) {
        $scope.allDecks = decks.data;
        $scope.decks = $scope.allDecks;
        $http.get("/api/v1/posts/search.json").then(function(posts) {
          $scope.allPosts = posts.data;
          $scope.posts = $scope.allPosts;
          $scope.startingIndex = 0;
          $scope.newSearch();
          $http.get("/api/v1/formats.json").then(function(formats) {
            $scope.formats = formats.data;

          });
        });
      });
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
      $scope.changeArchetypeAndFormat();
      $scope.orderAttribute = "updated_at"
      $scope.direction = true;
      $scope.startingIndex = 0;
      var search = {
        typeName: $scope.searchType,
        format: $scope.format_id,
        archetype: $scope.archetype_id,
        oppArchetype: $scope.opp_archetype_id,
        username: $scope.searchUser,
        numberOfRecords: $scope.numberOfRecords
      };
      $scope.search = angular.copy(search);
      var params = {
        type: search.typeName,
        format: search.format,
        archetype: search.archetype,
        opp_archetype: search.oppArchetype,
        username: search.username,
      }
      $location.search(params);
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
      $scope.showRecords()

    }
    $scope.changeArchetypeAndFormat = function() {
      if ($scope.chosenArchetype) {
        $scope.archetype_id = $scope.chosenArchetype.id;
      } else {
        $scope.archetype_id = null;
      }
      if ($scope.chosenOppArchetype) {
        $scope.opp_archetype_id = $scope.chosenOppArchetype.id;
      } else {
        $scope.opp_archetype_id = null;
      }
      if ($scope.chosenFormat) {
        $scope.format_id = $scope.chosenFormat.id;
      } else {
        $scope.format_id = null;
      }
    }
    $scope.showRecords = function() {
      if ($scope.search.typeName === 'post') {
        $scope.shownPosts = [];
        for(var i=$scope.startingIndex; i<$scope.startingIndex + $scope.search.numberOfRecords; i++) {
          if ($scope.posts[i]) {
            $scope.shownPosts.push($scope.posts[i])
          }
        }
      }
      if ($scope.search.typeName === 'deck') {
        $scope.shownDecks = [];
        for(var i=$scope.startingIndex; i<$scope.startingIndex + $scope.search.numberOfRecords; i++) {
          if ($scope.decks[i]) {
            $scope.shownDecks.push($scope.decks[i])
          }
        }
      }
      $scope.page = $scope.startingIndex/$scope.search.numberOfRecords + 1
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
      $http.get("/api/v1/archetypes.json?format_id=" + $scope.chosenFormat["id"]).then(function(response) {
        $scope.archetypes = response.data;
      });
      $scope.changeArchetypeAndFormat()
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
    $scope.changePage = function(type) {
      if (type === "forward") {
        $scope.startingIndex += $scope.search.numberOfRecords;
      } else if (type === "back") {
        $scope.startingIndex -= $scope.search.numberOfRecords;
      }
      $scope.showRecords()
    }
    $scope.showNext = function() {

      if (($scope.search.typeName === 'post' && $scope.startingIndex + $scope.search.numberOfRecords - 1 >= $scope.posts.length) ||
        ($scope.search.typeName === 'deck' && $scope.startingIndex + $scope.search.numberOfRecords - 1 >= $scope.decks.length)) {
        return false
      }
      return true
    }
  });
}());