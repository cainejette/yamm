var express = require('express');
var proxy = require('http-proxy');
var app = express();
var curl = require('curlrequest');
var uuid = require('node-uuid');
var moment = require('moment');

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
    console.log(moment().format('h:mm:ss a'), req.method, req.url);
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

        var todos = JSON.parse(data).Items;

        // filter for todos of form: Completed: "title" and strip down to just title
        var completeTodos = todos.filter(todo => todo.content.includes("Completed:"));
        var mappedTodos = completeTodos.map(todo => todo.content.substring(todo.content.indexOf('"') + 1, todo.content.length - 1));
        var openTodos = todos.filter(todo => !todo.content.includes("Completed:"));
        var actualRemainingTodos = openTodos.filter(todo => {
            return mappedTodos.indexOf(todo.content) === -1;
        }).map(todo => todo.content);

        var notActualRemainingTodos = openTodos.filter(todo => mappedTodos.indexOf(todo.content) != -1);
        var toDelete = notActualRemainingTodos.concat(completeTodos).map(todo => todo.id);

        // delete from todoist
        if (toDelete.length) {
            var deleteOptions = {
                url: 'https://todoist.com/API/v6/sync',
                data: {
                    token: secrets.todoistKey,
                    commands: '[{"type": "item_delete", "uuid": "{0}", "args": {"ids": [{1}]}}]'
                        .replace('{0}', uuid.v4())
                        .replace('{1}', toDelete.toString())
                }
            }
            curl.request(deleteOptions, (err2, data2) => {
                err2 ? console.dir(err2) : console.dir(data2);
            });
        }

        res.send(actualRemainingTodos);
    })
});


