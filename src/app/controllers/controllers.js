angular.module('yamm').controller('timeCtrl',
    ['$scope', '$interval',
        function ($scope, $interval) {
            $scope.hideColon = true;
            $scope.visible = true;
            
            $interval(() => {
                $scope.currentTime = new Date();
                $scope.hideColon = !$scope.hideColon;
            }, 1000);
        }]
);

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

            getWeather();
            getForecast();
            $interval(getWeather, 600000);
            $interval(getForecast, 180000);
        }]
);

angular.module('yamm').controller('travelCtrl',
    ['$scope', 'api',
        function ($scope, api) {
            var getTravelTimes = () => {
                api.getTravelTimes().then(data => {
                    $scope.travelTime = data.rows[0].elements[0].duration.text;
                });
            }

            getTravelTimes();
        }]
);

angular.module('yamm').controller('redditCtrl',
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            var getTopPosts = () => {
                api.getTopPosts().then(data => {
                    $scope.topPosts = data.data.children;
                    changeSelectedPost();
                });
            }

            var changeSelectedPost = () => {
                $scope.selectedPost = $scope.topPosts[Math.floor(Math.random() * $scope.topPosts.length)].data.title
            }

            getTopPosts();

            $interval(getTopPosts, 300000);
            $interval(changeSelectedPost, 30000);
        }]
)

angular.module('yamm').controller('todoCtrl',
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            var getTodos = () => {
                api.getTodos().then(data => {
                    $scope.todos = data;
                });
            }

            getTodos();

            $interval(getTodos, 60000);
        }]
)

angular.module('yamm').controller('xkcdCtrl',
    ['$scope', 'api', '$interval', '$rootScope',
        function ($scope, api, $interval, $rootScope) {
            $scope.comics = [];
            
            $scope.visible = true;
            var getComic = () => {                
                api.getXkcd().then(data => {
                    $scope.comics[0] = {
                        'title': data.title,
                        'comic': data.img,
                        'alt': data.alt
                    };
                });
            }
            
            $scope.$on('hide xkcd', (event, arg) => {
                $scope.visible = false;
            });
            
            $scope.$on('show xkcd', (event, arg) => {
                $scope.visible = true;
            })
            
            getComic();

            $interval(getComic, 45000);
        }]
)

angular.module('yamm').controller('jobCtrl',
    ['$scope', 'api', '$interval',
        function ($scope, api, $interval) {
            $scope.jobs = [];

            var getJobs = () => {
                api.getJobs().then(data => {
                    $scope.jobs = data;
                });
            }

            getJobs();

            $interval(getJobs, 3600000);
        }]
)

angular.module('yamm').controller('voiceCtrl',
    ['$scope', '$rootScope', 
        function($scope, $rootScope) {
            
            var commands = {
                'hide xkcd': () => {
                    $rootScope.$broadcast('hide xkcd');
                },
                'show xkcd': () => {
                    $rootScope.$broadcast('show xkcd');
                }
            };
            
            annyang.addCommands(commands);
            annyang.start();
        }]
)