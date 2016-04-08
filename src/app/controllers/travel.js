'use strict';

angular.module('yamm').controller('travelCtrl',
    ['$scope', 'api',
        function ($scope, api) {
            const getTravelTimes = () => {
                api.getTravelTimes().then(data => {
                    $scope.travelTime = data.rows[0].elements[0].duration.text;
                });
            }
            
            $scope.visible = true;            
            $scope.$on('hide', (event, arg) => {
                $scope.visible = false;
            });
            
            $scope.$on('show', (event, arg) => {
                $scope.visible = true;
            })

            getTravelTimes();
        }]
);