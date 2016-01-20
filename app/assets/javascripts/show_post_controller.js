(function() {
  "use strict";

  angular.module("app").controller("showPostCtrl", function($scope, $http, $window) {
    window.$scope = $scope;
    $scope.initialize = function(postId, userId) {
      $http.get("/api/v1/post_comments.json?post_id=" + postId).then(function(response) {
        $scope.comments = response.data;
        $scope.newComment = {post_id: postId, user_id: userId}
      }, function(error) {
        $scope.comments = [];
        $scope.newComment = {post_id: postId, user_id: userId}
      });
    }
    $scope.addComment = function() {
      $http.post("/api/v1/post_comments.json", $scope.newComment).then(function(response) {
        $scope.comments.push(response.data);
        $scope.newComment = {post_id: response.data.post_id, user_id: response.data.user_id}
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
          $http.patch("/api/v1/post_comments/" + commentId + ".json", $scope.comments[i]).then(function(response) {
            var postId = response.data.post.id;
            $http.get("/api/v1/post_comments.json?post_id=" + postId).then(function(comments) {
              $scope.comments = angular.copy(comments.data);
            });
          });
        }
      }
    }
    $scope.deleteComment = function(commentId) {
      for (var i=0;i<$scope.comments.length; i++) {
        if ($scope.comments[i].id === commentId) {
          $http.delete("/api/v1/post_comments/" + commentId + ".json").then(function(response) {
            $scope.comments = response.data;
          });
        }
      }
    }
  });
}());