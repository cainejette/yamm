'use strict';

angular.module('yamm').controller('weatherCtrl',
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            var getWeather = () => {
                api.getWeather().then(data => {
                    $scope.currentTemperature = data.temp;
                    $scope.icon = "wi-owm-" + data.icon;
                });
            };

            var getForecast = () => {
                api.getForecast().then(data => {
                    $scope.forecasts = data.list.map(x => {
                        return {
                            'time': new Date(x.dt * 1000),
                            'temp': Math.round(x.main.temp)
                        }
                    });
                });
            }
            
            $scope.visible = true;            
            $scope.$on('hide', (event, arg) => {
                $scope.visible = false;
            });
            
            $scope.$on('show', (event, arg) => {
                $scope.visible = true;
            })

            getWeather();
            getForecast();
            $interval(getWeather, 600000);
            $interval(getForecast, 180000);
        }]
);