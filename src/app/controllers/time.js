'use strict';

angular.module('yamm').controller('timeCtrl',
    ['$scope', '$interval',
        function ($scope, $interval) {
            this.hideColon = true;
            this.visible = true;
            
            $scope.$on('hide', (event, arg) => {
                this.visible = false;
            });
            
            $scope.$on('show', (event, arg) => {
                this.visible = true;
            })

            $interval(() => {
                this.currentTime = new Date();
                this.hideColon = !this.hideColon;
            }, 1000);
        }]
);