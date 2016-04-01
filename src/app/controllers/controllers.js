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
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            var fetchWeather = () => {
                api.getWeather().then(data => {
                    $scope.currentTemperature = Math.round(data.main.temp);
                });
            };

            var fetchForecast = () => {
                api.getForecast().then(data => {
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

angular.module('yamm').controller('travelCtrl',
    ['$scope', 'api',
        function ($scope, api) {
            var fetchTravelTimes = () => {
                api.getTravelTimes().then(data => {
                    $scope.travelTime = data.rows[0].elements[0].duration.text;
                });
            }

            fetchTravelTimes();
        }]
);

angular.module('yamm').controller('redditCtrl',
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            var fetchTopPosts = () => {
                api.getTopPosts().then(data => {
                    $scope.topPosts = data.data.children;
                    changeSelectedPost();
                });
            }

            var changeSelectedPost = () => {
                $scope.selectedPost = $scope.topPosts[Math.floor(Math.random() * $scope.topPosts.length)].data.title
            }

            fetchTopPosts();

            $interval(fetchTopPosts, 300000);
            $interval(changeSelectedPost, 10000);
        }]
)

angular.module('yamm').controller('todoCtrl',
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            var fetchTodos = () => {
                api.getTodos().then(data => {
                    $scope.todos = data;
                });
            }

            fetchTodos();

            $interval(fetchTodos, 180000);
        }]
)
