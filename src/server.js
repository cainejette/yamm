var express = require('express');
var proxy = require('http-proxy');
var app = express();
var curl = require('curlrequest');

var secrets = require('../secrets.json');
var config = require('../config.json');

var port = 3000;

app.set('port', port);
app.use(express.static(__dirname + '/app'));

proxy.prototype.onError = (err) => {
    console.log(err);
}

var router = express.Router();
var api = proxy.createProxyServer({ changeOrigin: false });

router.use((req, res, next) => {
    console.log(req.method, req.url);
    next(); 
});

router.get('/api/weather', (req, res) => {
    api.web(req, res, { target: 
        'http://api.openweathermap.org/data/2.5/weather?APPID={0}&units={1}&q={2}'
            .replace('{0}', secrets.weatherKey)
            .replace('{1}', config.units)
            .replace('{2}', config.weather.city) 
        });
});

router.get('/api/forecast', (req, res) => {
    api.web(req, res, { target: 
        'http://api.openweathermap.org/data/2.5/forecast?APPID={0}&units={1}&q={2}'
            .replace('{0}', secrets.weatherKey)
            .replace('{1}', config.units)
            .replace('{2}', config.weather.city) 
        });
});

var GoogleMapsAPI = require('googlemaps');
var gmAPI = new GoogleMapsAPI({key: secrets.mapKey, secure: true});

router.get('/api/travel', (req, res) => {
    var params = {
        origins: config.travel.home,
        destinations: config.travel.destinations[0],
        units: config.units
    }

    gmAPI.distance(params, (err, results) => {
        err ? res.send(err) : res.send(results);
    });
});

router.get('/api/reddit', (req, res) => {
    curl.request('https://www.reddit.com/r/{0}/top.json?count=20'.replace('{0}', config.subreddit), (err, data) => {
        err ? res.send(err) : res.send(data);
    })
});

router.get('/api/todo', (req, res) => {
    var options = {
        url: 'https://todoist.com/API/v6/sync',
        data: {
            token: secrets.todoistKey,
            seq_no: 0,
            resource_types: '["items"]'
        }
    }
   curl.request(options, (err, data) => {
       if (err) {
           res.send(err);
       }

       var todos = JSON.parse(data).Items.map(todo => todo.content);

       // filter for todos of form: Completed: "title" and strip down to just title
       var completeTodos = todos.filter(todo => todo.includes("Completed:"))
            .map(todo => todo.substring(todo.indexOf('"') + 1, todo.length - 1));
       var openTodos = todos.filter(todo => !todo.includes("Completed:"));
       var actualRemainingTodos = openTodos.filter(todo => {
           return completeTodos.indexOf(todo) === -1;
       });

       res.send(actualRemainingTodos);
   })
});

app.use('/', router);

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});



