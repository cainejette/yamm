'use strict';

angular.module('yamm').controller('travelCtrl',
    ['$scope', 'api',
        function ($scope, api) {
            const getTravelTimes = () => {
                api.getTravelTimes().then(data => {
                    this.travelTime = data.rows[0].elements[0].duration.text;
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
        }]
);