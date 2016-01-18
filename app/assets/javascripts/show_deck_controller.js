(function() {
  "use strict";

  angular.module("app").controller("showDeckCtrl", function($scope, $http, $window) {
    window.$scope = $scope;
    $scope.initialize = function(deckId, userId) {
      console.log(deckId);
      $http.get("/api/v1/deck_comments.json?deck_id=" + deckId).then(function(response) {
        $scope.comments = response.data;
        $scope.newComment = {deck_id: deckId, user_id: userId}
      }, function(error) {
        $scope.comments = [];
        $scope.newComment = {deck_id: deckId, user_id: userId}
      });
    }
    $scope.addComment = function() {
      $http.post("/api/v1/deck_comments.json", $scope.newComment).then(function(response) {
        $scope.comments.push(response.data);
        $scope.newComment = {deck_id: response.data.deck_id, user_id: response.data.user_id}
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
  });
}());