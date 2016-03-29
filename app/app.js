var app = angular.module('yamm', []);

app.controller('timeCtrl', ['$scope', '$interval', function($scope, $interval) {
  $interval(() => $scope.currentTime = new Date(), 1000);
}]);

app.controller('weatherCtrl', ['$scope', 'weatherService', function($scope, weatherService) {
  function fetchWeather(zip) {
    weatherService.getWeather(zip).then(function(data){
      
      $scope.place = data.name;
      var today = data.list.slice(0, 7).map(x => x.main.temp).reduce((x, y) => x + y) / 7;
      var tomorrow = data.list.slice(8, 14).map(x => x.main.temp).reduce((x, y) => x + y) / 7;
      var overmorrow = data.list.slice(15, 21).map(x => x.main.temp).reduce((x, y) => x + y) / 7;
      console.dir(today);
      
      $scope.weather = [today, tomorrow, overmorrow];
      
      $scope.weather2 = data.list.slice(0, 7).map(x => {
        return {'time': new Date(x.dt), 'temp': x.main.temp};
      });
      
      console.dir($scope.weather2);
    }); 
  }
  
  fetchWeather('98103');
  
}]);

app.factory('weatherService', ['$http', '$q', function ($http, $q){
  function getWeather (zip) {
    var deferred = $q.defer();
    $http.get('http://api.openweathermap.org/data/2.5/forecast?q=Seattle&APPID=348b7efbb2dd9a705529089eed545a15&units=imperial')
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(err){
        console.log('Error retrieving markets');
        deferred.reject(err);
      });
    return deferred.promise;
  }
  
  return {
    getWeather: getWeather
  };
}]);