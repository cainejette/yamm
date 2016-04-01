angular.module('yamm').factory('api', ['$http', '$q', function ($http, $q) {
  var getData = (url) => {
    var deferred = $q.defer();
    $http.get(url)
      .success(data => deferred.resolve(data))
      .error(err => {
        console.log('Error fetching from: ' + url);
        deferred.reject(err);
      });

    return deferred.promise;
  }

  var getWeather = () => {
    return getData('/api/weather');
  }
  
  var getForecast = () => {
    return getData('/api/forecast');
  }
  
  var getTravelTimes = () => {
    return getData('/api/travel');
  }
  
  var getTopPosts = () => {
    return getData('/api/reddit');
  }

  return {
    getWeather,
    getForecast,
    getTravelTimes,
    getTopPosts
  };
}]);