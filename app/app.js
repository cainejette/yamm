var app = angular.module('yamm', []);

app.controller('timeCtrl', ['$scope', '$interval', function($scope, $interval) {
  $interval(() => $scope.currentTime = new Date(), 1000);
}]);

app.controller('weatherCtrl', ['$scope', '$interval', 'weatherService', function($scope, $interval, weatherService) {
  fetchWeather = (zip) => {
    weatherService.getWeather(zip).then(function(data){
      $scope.currentTemperature = data.main.temp;      
    }); 
  }
  
  // update weather every 10 minutes
  $interval(fetchWeather('98103'), 60000);
}]);

app.factory('weatherService', ['$http', '$q', function ($http, $q){
  function getWeather (zip) {
    var deferred = $q.defer();
    $http.get('http://api.openweathermap.org/data/2.5/weather?zip=98103,us&APPID=348b7efbb2dd9a705529089eed545a15&units=imperial')
      .success(data => deferred.resolve(data))
      .error(err => {
        console.log('Error retrieving markets');
        deferred.reject(err);
      });
    return deferred.promise;
  }
  
  return {
    getWeather: getWeather
  };
}]);