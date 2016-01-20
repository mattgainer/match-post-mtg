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
      $http.get("/api/v1/post_ratings.json?post_id=" + postId).then(function(response) {
        $scope.ratings = response.data;
        for (var i=0;i<$scope.ratings.length;i++) {
          if ($scope.ratings[i].user_id === userId) {
            $scope.myRating = $scope.ratings[i];
            $scope.myRating.rating = $scope.myRating.rating.toString();
            $scope.iRated = true;
            break
          } else {
            $scope.myRating = {user_id: userId, post_id: postId};
          }
        }
        if (!$scope.ratings.length) {
          $scope.myRating = {user_id: userId, post_id: postId}
          console.log($scope.myRating)
        }
        var sum=0;
        for (var i=0;i<$scope.ratings.length;i++) {
          sum+=parseInt($scope.ratings[i].rating);
        }
        $scope.avgRating = sum / $scope.ratings.length
      }, function(error) {
        $scope.ratings = []
        $scope.myRating = {user_id: userId, post_id: postId}
      });
    }
    $scope.editRating = function(ratingId) {
      for (var i=0;i<$scope.ratings.length;i++) {
        if ($scope.ratings[i].id === ratingId) {
          $http.patch("/api/v1/post_ratings/" + ratingId + ".json", $scope.myRating).then(function(response) {
            var postId = response.data.post_id;
            $scope.myRating = response.data
            $scope.myRating.rating = $scope.myRating.rating.toString();
            $http.get("/api/v1/post_ratings.json?post_id=" + postId).then(function(ratings) {
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
    $scope.addRating = function(postId) {
      console.log($scope.myRating)
      $http.post("/api/v1/post_ratings.json", $scope.myRating).then(function(response) {
        $scope.iRated = true;
        $scope.myRating = response.data;
        $scope.myRating.rating = $scope.myRating.rating.toString();
        var postId = response.data.post_id;
        $http.get("/api/v1/post_ratings.json?post_id=" + postId).then(function(ratings) {
          $scope.ratings = ratings.data;
          var sum=0;
          for (var j=0;j<$scope.ratings.length;j++) {
            sum+=parseInt($scope.ratings[j].rating);
          }
          $scope.avgRating = sum / $scope.ratings.length
        });
      })
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