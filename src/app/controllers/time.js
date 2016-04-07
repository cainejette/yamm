'use strict';

angular.module('yamm').controller('timeCtrl',
    ['$scope', '$interval',
        function ($scope, $interval) {
            $scope.hideColon = true;
            $scope.visible = true;
            
            $scope.$on('hide', (event, arg) => {
                $scope.visible = false;
            });
            
            $scope.$on('show', (event, arg) => {
                $scope.visible = true;
            })

            $interval(() => {
                $scope.currentTime = new Date();
                $scope.hideColon = !$scope.hideColon;
            }, 1000);
        }]
);