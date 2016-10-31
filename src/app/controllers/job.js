'use strict';

angular.module('yamm').controller('jobCtrl',
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            this.jobs = [];
            this.visible = false;

            const getJobs = () => {
                api.getJobs().then(data => {
                    this.jobs = data;

                    // hide if no jobs in 5 days
                    if (this.jobs && this.jobs.length > 0 && (new Date() - this.jobs[0].date) > 4.32 * 10^8) { // subtracting dates gives milliseconds
                        this.visible = false;
                    } else {
                        this.visible = true;
                    }
                });
            }

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
