angular.module('yamm').controller('timeCtrl',
    ['$scope', '$interval',
    function ($scope, $interval) {
        $scope.hideColon = true;

        $interval(() => {
            $scope.currentTime = new Date();
            $scope.hideColon = !$scope.hideColon;
        }, 1000);
    }]
);

angular.module('yamm').controller('weatherCtrl',
    ['$scope', 'api', '$interval', 'weatherService',
    function ($scope, api, $interval, weatherService) {
        fetchWeather = () => {
            api.getWeather().then(data => {
                // weatherService.getWeather().then(data => {
                $scope.currentTemperature = Math.round(data.main.temp);
            })
        };

        fetchForecast = () => {
            weatherService.getForecast().then(data => {
                $scope.forecasts = data.list.map(x => {
                    return {
                        'time': new Date(x.dt * 1000),
                        'temp': Math.round(x.main.temp)
                    }
                });
            });
        }

        fetchWeather();
        fetchForecast();
        $interval(fetchWeather, 600000);
        $interval(fetchForecast, 180000);
    }]
);
