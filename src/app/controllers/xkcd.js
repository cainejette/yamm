'use strict';

angular.module('yamm').controller('xkcdCtrl',
    ['$scope', 'api', '$interval', '$rootScope', '$timeout',
        function ($scope, api, $interval, $rootScope, $timeout) {
            this.comics = [];

            const getComic = () => {
                api.getXkcd().then(data => {
                    if (this.comics.length) {
                        this.comics.pop();
                    }

                    $timeout(() => {
                        this.comics.push({
                            'title': data.title,
                            'comic': data.img,
                            'alt': data.alt
                        });
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

            getComic();

            $interval(getComic, 60000);
        }]
)
