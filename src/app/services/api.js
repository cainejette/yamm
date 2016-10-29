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

  const getForecast = () => {
    return getData('/api/forecast');
  }

  const getTravelTimes = () => {
    return getData('/api/travel');
  }

  const getTopPosts = () => {
    return getData('/api/reddit');
  }

  const getTodos = () => {
    return getData('/api/todo');
  }
  
  const getXkcd = () => {
    return getData('/api/xkcd');
  }
  
  const getJobs = () => {
    return getData('/api/jobs');
  }

  return {
    getData,
    getWeather,
    getForecast,
    getTravelTimes,
    getTopPosts,
    getTodos,
    getXkcd,
    getJobs
  };
}]);