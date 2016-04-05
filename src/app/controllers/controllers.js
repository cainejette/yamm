angular.module('yamm').controller('timeCtrl',
    ['$scope', '$interval', 'AnnyangService',
        function ($scope, $interval, AnnyangService) {
            $scope.hideColon = true;

            var vm = this;

            vm.init = function() {
                vm.clearResults();

                AnnyangService.addCommand('*allSpeech', function(allSpeech) {
                    console.debug(allSpeech);
                    vm.addResult(allSpeech);
                });
                
                AnnyangService.start();
            };
            
            vm.addResult = function(result) {
                vm.results.push({
                    content: result,
                    date: new Date()
                });
            };
            
            vm.clearResults = function() {
                vm.results = [];
            };

            vm.init();
            
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
                    $scope.currentTemperature = data.temp;
                    // $scope.icon = "http://openweathermap.org/img/w/" + data.icon + ".png";
                    $scope.icon = "wi-owm-" + data.icon;
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
            $interval(changeSelectedPost, 30000);
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

            $interval(fetchTodos, 60000);
        }]
)

angular.module('yamm').controller('xkcdCtrl',
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            $scope.comics = [];
            
            $scope.showXkcd = true;
            var fetchComic = () => {                
                api.getXkcd().then(data => {
                    $scope.comics[0] = {
                        'title': data.title,
                        'comic': data.img,
                        'alt': data.alt
                    };
                });
            }

            fetchComic();

            $interval(fetchComic, 45000);
        }]
)

angular.module('yamm').controller('jobCtrl',
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            $scope.jobs = [];

            var fetchJobs = () => {
                api.getJobs().then(data => {
                    $scope.jobs = data;
                });
            }

            fetchJobs();

            $interval(fetchJobs, 3600000);
        }]
)