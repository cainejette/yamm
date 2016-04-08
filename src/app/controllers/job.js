'use strict';

angular.module('yamm').controller('jobCtrl',
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            this.jobs = [];

            const getJobs = () => {
                api.getJobs().then(data => {
                    this.jobs = data;
                });
            }

            this.visible = true;
            $scope.$on('hide', (event, arg) => {
                this.visible = false;
            });

            $scope.$on('show', (event, arg) => {
                this.visible = true;
            })

            getJobs();

            $interval(getJobs, 3600000);
        }]
)
