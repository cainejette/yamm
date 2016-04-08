'use strict';

angular.module('yamm').controller('xkcdCtrl',
    ['$scope', 'api', '$interval', '$rootScope',
        function ($scope, api, $interval, $rootScope) {
            this.comics = [];

            const getComic = () => {
                api.getXkcd().then(data => {
                    this.comics[0] = {
                        'title': data.title,
                        'comic': data.img,
                        'alt': data.alt
                    };
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

            $interval(getComic, 45000);
        }]
)
