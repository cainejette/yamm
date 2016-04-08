'use strict';

angular.module('yamm').controller('weatherCtrl',
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            const getWeather = () => {
                api.getWeather().then(data => {
                    this.currentTemperature = data.temp;
                    this.icon = "wi-owm-" + data.icon;
                });
            };

            const getForecast = () => {
                api.getForecast().then(data => {
                    this.forecasts = data.list.map(x => {
                        return {
                            'time': new Date(x.dt * 1000),
                            'temp': Math.round(x.main.temp)
                        }
                    });
                });
            }

            this.visible = true;
            $scope.$on('hide', (event, arg) => {
                this.visible = false;
            });

            $scope.$on('show', (event, arg) => {
                this.visible = true;
            })

            getWeather();
            getForecast();
            $interval(getWeather, 600000);
            $interval(getForecast, 180000);
        }]
);