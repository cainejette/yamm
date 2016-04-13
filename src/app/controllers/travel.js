'use strict';

angular.module('yamm').controller('travelCtrl',
    ['$scope', 'api',
        function ($scope, api) {
            const getTravelTimes = () => {
                api.getTravelTimes().then(data => {
                    this.travelTime = data.rows[0].elements[0].duration.text;

                    // slice off the last s
                    if (this.travelTime[this.travelTime.length - 1] == 's') {
                        this.travelTime = this.travelTime.slice(0, this.travelTime.length - 1)
                    }
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