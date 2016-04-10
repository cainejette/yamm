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

            this.timeElapsed = 0;
            var timerPromise;
            $scope.$on('start timer', (event, arg) => {
                timerPromise = $interval(() => {
                    this.timeElapsed += .1
                }, 100);
            });

            $scope.$on('stop', (event, arg) => {
                $interval.cancel(timerPromise);
                this.timeElapsed = 0;
            })

            $interval(() => {
                this.currentTime = new Date();
                this.hideColon = !this.hideColon;
            }, 1000);
        }]
);