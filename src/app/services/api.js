angular.module('yamm').factory('api', ['$http', '$q', function ($http, $q) {
  var getData = (url) => {
    var deferred = $q.defer();
    $http.get(url)
      .success(data => deferred.resolve(data))
      .error(err => {
        console.log('Error fetching from: ' + url);
        console.dir(new Date());
        deferred.reject(err);
      });

    return deferred.promise;
  }

  var getWeather = () => {
    return getData('/api/weather').then(data => {
      return {
        'temp': Math.round(data.main.temp),
        'icon': data.weather[0].id  
      }
    });
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

  var getTodos = () => {
    return getData('/api/todo');
  }

  return {
    getWeather,
    getForecast,
    getTravelTimes,
    getTopPosts,
    getTodos
  };
}]);