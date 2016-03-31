var express = require('express');
var proxy = require('http-proxy');
var app = express();

var secrets = require('./secrets.json');

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
    api.web(req, res, { target: 'http://api.openweathermap.org/data/2.5/weather?APPID={0}&units=imperial&q=98103,us'.replace('{0}', secrets.weatherKey) });
})

router.get('/api/forecast', (req, res) => {
    api.web(req, res, { target: 'http://api.openweathermap.org/data/2.5/forecast?APPID={0}&units=imperial&q=98103,us'.replace('{0}', secrets.weatherKey) });
})

var GoogleMapsAPI = require('googlemaps');
var gmAPI = new GoogleMapsAPI({key: secrets.mapKey, secure: true});

router.get('/api/travel', (req, res) => {
    var params = {
        origins: 'Seattle, WA',
        destinations: 'Bellevue, WA',
        units: 'imperial'
    }

    gmAPI.distance(params, (err, results) => {
        err ? res.send(err) : res.send(results);
    });
})

app.use('/', router);

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});