angular.module('yamm').factory('api', ['$http', '$q', function ($http, $q) {
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

  getWeather = () => {
    return getData('/api/weather');
  }

  return {
    getWeather: getWeather
  };
}]);

angular.module('yamm').factory('weatherService', ['$http', '$q', function ($http, $q) {
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