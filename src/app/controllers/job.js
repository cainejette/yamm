'use strict';

angular.module('yamm').controller('jobCtrl',
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            $scope.jobs = [];

            var getJobs = () => {
                api.getJobs().then(data => {
                    $scope.jobs = data;
                });
            }

            $scope.visible = true;            
            $scope.$on('hide', (event, arg) => {
                $scope.visible = false;
            });
            
            $scope.$on('show', (event, arg) => {
                $scope.visible = true;
            })

            getJobs();

            $interval(getJobs, 3600000);
        }]
)
