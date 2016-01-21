(function() {
  "use strict";

  angular.module("app").controller("showDeckCtrl", function($scope, $http, $window) {
    window.$scope = $scope;
    $scope.initialize = function(deckId, userId) {
      $http.get("/api/v1/deck_comments.json?deck_id=" + deckId).then(function(response) {
        $scope.comments = response.data;
        $scope.newComment = {deck_id: deckId, user_id: userId}
      }, function(error) {
        $scope.comments = [];
        $scope.newComment = {deck_id: deckId, user_id: userId}
      });
      $http.get("/api/v1/deck_ratings.json?deck_id=" + deckId).then(function(response) {
        $scope.ratings = response.data;
        for (var i=0;i<$scope.ratings.length;i++) {
          if ($scope.ratings[i].user_id === userId) {
            $scope.myRating = $scope.ratings[i];
            $scope.myRating.rating = $scope.myRating.rating.toString();
            $scope.iRated = true;
            break
          } else {
            $scope.myRating = {user_id: userId, deck_id: deckId};
          }
        }
        if (!$scope.ratings.length) {
          $scope.myRating = {user_id: userId, deck_id: deckId}
          console.log($scope.myRating)
        }
        var sum=0;
        for (var i=0;i<$scope.ratings.length;i++) {
          sum+=parseInt($scope.ratings[i].rating);
        }
        $scope.avgRating = sum / $scope.ratings.length
      }, function(error) {
        $scope.ratings = []
        $scope.myRating = {user_id: userId, deck_id: deckId}
      });
    }
    $scope.addComment = function() {
      $http.post("/api/v1/deck_comments.json", $scope.newComment).then(function(response) {
        $scope.comments.push(response.data);
        $scope.newComment = {deck_id: response.data[0].deck_id, user_id: response.data[0].user_id}
      });
    }
    $scope.toggleEditing = function(commentId) {
      console.log($scope.comments)
      for (var i=0; i< $scope.comments.length;i++) {
        if ($scope.comments[i].id === commentId) {
          $scope.comments[i].editing = !$scope.comments[i].editing;
          if ($scope.comments[i].editing) {
            $scope.oldText = $scope.comments[i].comment_text;
          } else {
            $scope.comments[i].comment_text = $scope.oldText;
          }
        }
      }
    }
    $scope.editRating = function(ratingId) {
      for (var i=0;i<$scope.ratings.length;i++) {
        if ($scope.ratings[i].id === ratingId) {
          $http.patch("/api/v1/deck_ratings/" + ratingId + ".json", $scope.myRating).then(function(response) {
            var deckId = response.data.deck_id;
            $scope.myRating = response.data
            $scope.myRating.rating = $scope.myRating.rating.toString();
            $http.get("/api/v1/deck_ratings.json?deck_id=" + deckId).then(function(ratings) {
              $scope.ratings = ratings.data;
              var sum=0;
              for (var j=0;j<$scope.ratings.length;j++) {
                sum+=parseInt($scope.ratings[j].rating);
              }
              $scope.avgRating = sum / $scope.ratings.length
            });
          });
        }
      }
    }
    $scope.addRating = function(deckId) {
      console.log($scope.myRating)
      $http.post("/api/v1/deck_ratings.json", $scope.myRating).then(function(response) {
        $scope.iRated = true;
        $scope.myRating = response.data;
        $scope.myRating.rating = $scope.myRating.rating.toString();
        var deckId = response.data.deck_id;
        $http.get("/api/v1/deck_ratings.json?deck_id=" + deckId).then(function(ratings) {
          $scope.ratings = ratings.data;
          var sum=0;
          for (var j=0;j<$scope.ratings.length;j++) {
            sum+=parseInt($scope.ratings[j].rating);
          }
          $scope.avgRating = sum / $scope.ratings.length
        });
      })
    }
    $scope.editComment = function(commentId) {
      for (var i=0;i<$scope.comments.length; i++) {
        if ($scope.comments[i].id === commentId) {
          $http.patch("/api/v1/deck_comments/" + commentId + ".json", $scope.comments[i]).then(function(response) {
            var deckId = response.data.deck.id;
            $http.get("/api/v1/deck_comments.json?deck_id=" + deckId).then(function(comments) {
              $scope.comments = angular.copy(comments.data);
            });
          });
        }
      }
    }
    $scope.deleteComment = function(commentId) {
      for (var i=0;i<$scope.comments.length; i++) {
        if ($scope.comments[i].id === commentId) {
          $http.delete("/api/v1/deck_comments/" + commentId + ".json").then(function(response) {
            $scope.comments = response.data;
          });
        }
      }
    }
  });
}());