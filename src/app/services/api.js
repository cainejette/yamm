angular.module('yamm').factory('api', ['$http', '$q', function ($http, $q) {
  const getData = (url) => {
    const deferred = $q.defer();
    $http.get(url)
      .success(data => deferred.resolve(data))
      .error(err => {
        console.log('Error fetching from: ' + url);
        console.dir(new Date());
        deferred.reject(err);
      });

    return deferred.promise;
  }

  const getWeather = () => {
    return getData('/api/weather').then(data => {
      return {
        'temp': Math.round(data.main.temp),
        'icon': data.weather[0].id
      }
    });
  }

  const getImage = () => {
    return getData('/api/image');
  }

  const getForecast = () => {
    return getData('/api/forecast');
  }

  const getXkcd = () => {
    return getData('/api/xkcd');
  }

  return {
    getImage,
    getData,
    getWeather,
    getForecast,
    getXkcd
  };
}]);