'use strict';

angular.module('yamm').controller('redditCtrl',
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            const getTopPosts = () => {
                api.getTopPosts().then(data => {
                    $scope.topPosts = data.data.children;
                    changeSelectedPost();
                });
            }

            const changeSelectedPost = () => {
                $scope.selectedPost = $scope.topPosts[Math.floor(Math.random() * $scope.topPosts.length)].data.title
            }

            getTopPosts();

            $interval(getTopPosts, 300000);
            $interval(changeSelectedPost, 30000);
        }]
)