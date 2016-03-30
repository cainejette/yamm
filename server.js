var express = require('express');
var proxy = require('http-proxy');
var app = express();

var port = 3000;

app.set('port', port);
app.use(express.static(__dirname + '/app'));

proxy.prototype.onError = (err) => {
    console.log(err);
}

var api = proxy.createProxyServer({ changeOrigin: false });
app.all('/api/weather', (req, res) => {
    console.log('asking for weather...:');
    api.web(req, res, { target: 'http://api.openweathermap.org/data/2.5/weather?q=98103,us&APPID=348b7efbb2dd9a705529089eed545a15&units=imperial' });
})

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
