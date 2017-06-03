'use strict';

angular.module('yamm').controller('jobCtrl',
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            this.visible = false;

            const getJobs = () => {
                this.jobs = [];

                api.getJobs().then(data => {
                    // hide if no jobs in 5 days
                    if (data && data.length > 0) {
                        var currentDate = new Date();

                        data.forEach(job => {
                            var jobDate = new Date(job.date);
                            
                            if ((currentDate - jobDate) < 6.048e+8) {
                                this.jobs.push(job);
                            }
                        });

                        if (this.jobs.length > 0) {
                            this.visible = true;
                        }
                        else {
                            this.visible = false;
                        }

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
