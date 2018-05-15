'use strict';

angular.module('yamm').controller('travelCtrl',
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            const getTravelTimes = () => {
                api.getTravelTimes().then(data => {
                    console.dir(data);
                    this.bikingTime = data.biking;
                    this.drivingTime = data.driving;
                });
            }

            this.visible = true;
            $scope.$on('hide', (event, arg) => {
                this.visible = false;
            });

            $scope.$on('show', (event, arg) => {
                this.visible = true;
            })

            getTravelTimes();
            $interval(getTravelTimes, 600000);
        }]
);