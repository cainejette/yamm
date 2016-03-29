var app = angular.module('yamm', []);

app.controller('timeCtrl', ['$scope', '$interval', function($scope, $interval) {
  $interval(() => $scope.currentTime = new Date(), 1000);
}]);

app.controller('weatherCtrl', ['$scope', '$interval', 'weatherService', function($scope, $interval, weatherService) {
  fetchWeather = () => {
    
    weatherService.getWeather().then(data => {
      $scope.currentTemperature = data.main.temp;
    })
    
    weatherService.getForecast().then(data => {
      $scope.forecasts = data.list.map(x => {
        return {
          'time': new Date(x.dt * 1000),
          'temp': x.main.temp
        }
      });
    }); 
  }
  
  $interval(fetchWeather(), 60000);
}]);

app.factory('weatherService', ['$http', '$q', function ($http, $q){
  getData = (url) => {
    var deferred = $q.defer();
    $http.get(url)
      .success(data => deferred.resolve(data))
      .error(err => {
        console.log('Error fetching from: ' + url);
        deferred.reject(err);
      });
      
    return deferred.promise;
  }

  getForecast = () => {
    return getData('http://api.openweathermap.org/data/2.5/forecast?q=98103,us&APPID=348b7efbb2dd9a705529089eed545a15&units=imperial');
  }  
  
  getWeather = () => {
    return getData('http://api.openweathermap.org/data/2.5/weather?q=98103,us&APPID=348b7efbb2dd9a705529089eed545a15&units=imperial');
  }
  
  return {
    getForecast: getForecast,
    getWeather: getWeather
  };
}]);