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

router.get('/api/weather', (req, res) => {
    console.log('asking for weather...:');
    api.web(req, res, { target: 'http://api.openweathermap.org/data/2.5/weather?APPID={0}&units=imperial&q=98103,us'.replace('{0}', secrets.weatherKey) });
})

router.get('/api/forecast', (req, res) => {
    console.log('asking for forecast...:');
    api.web(req, res, { target: 'http://api.openweathermap.org/data/2.5/forecast?APPID={0}&units=imperial&q=98103,us'.replace('{0}', secrets.weatherKey) });
})

app.use('/', router);

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
