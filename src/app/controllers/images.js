'use strict';

angular.module('yamm').controller('imageCtrl',
    ['$scope', 'api', '$interval', '$rootScope', '$timeout',
        function ($scope, api, $interval, $rootScope, $timeout) {
            this.images = [];

            const getImage = () => {
                api.getImage().then(data => {
                    if (this.images.length) {
                        this.images.pop();
                    }

                    $timeout(() => {
                        console.dir(data);
                        this.images.push(data);
                    }, 2000);
                });
            }

            this.visible = true;
            $scope.$on('hide', (event, arg) => {
                this.visible = false;
            });

            $scope.$on('show', (event, arg) => {
                this.visible = true;
            })

            getImage();

            $interval(getImage, 10000);
        }]
)
