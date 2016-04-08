'use strict';

angular.module('yamm').controller('xkcdCtrl',
    ['$scope', 'api', '$interval', '$rootScope',
        function ($scope, api, $interval, $rootScope) {
            $scope.comics = [];

            const getComic = () => {
                api.getXkcd().then(data => {
                    $scope.comics[0] = {
                        'title': data.title,
                        'comic': data.img,
                        'alt': data.alt
                    };
                });
            }

            $scope.visible = true;
            $scope.$on('hide', (event, arg) => {
                $scope.visible = false;
            });

            $scope.$on('show', (event, arg) => {
                $scope.visible = true;
            })

            getComic();

            $interval(getComic, 45000);
        }]
)
