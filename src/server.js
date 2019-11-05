const express = require('express');
const proxy = require('http-proxy');
const app = express();
const curl = require('curlrequest');
const moment = require('moment');
const cheerio = require('cheerio');

const path = require('path');
const fs = require('fs');

const config = require('./config.json');
console.log('process.env.YAMM_PORT', process.env.YAMM_PORT);
const port = process.env.YAMM_PORT || 3001;
app.set('port', port);

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/images'));

proxy.prototype.onError = (err) => {
    console.log(err);
}

const router = express.Router();
const api = proxy.createProxyServer({ changeOrigin: false });

router.use((req, res, next) => {
    console.log(moment().format('YYYY/MM/DD h:mm:ss a'), req.method, req.url);
    next();
});

router.get('/api/weather', (req, res) => {
    console.log('loading weather');

    if (!process.env.YAMM_WEATHER_KEY) {
        res.send('no weather key found in the environment!');
    }
    else {
        curl.request('http://api.openweathermap.org/data/2.5/weather?APPID={0}&units={1}&q={2}'
            .replace('{0}', process.env.YAMM_WEATHER_KEY)
            .replace('{1}', config.units)
            .replace('{2}', config.weather.city), (err, raw) => {
                if (err) {
                    console.error('error parsing weather');
                    console.error(err);
                    res.send(err);
                }
                else {
                    var data = JSON.parse(raw);
                    console.log('current temp is: ' + data.main.temp);
                    res.send(data);
                }
        });
    }
});

router.get('/api/forecast', (req, res) => {
    console.log('loading forecast');
    if (!process.env.YAMM_WEATHER_KEY) {
        res.send('no weather key found in the environment!');
    }
    else {
        curl.request('http://api.openweathermap.org/data/2.5/forecast?APPID={0}&units={1}&q={2}'
            .replace('{0}', process.env.YAMM_WEATHER_KEY)
            .replace('{1}', config.units)
            .replace('{2}', config.weather.city), (err, data) => {
                if (err) {
                    console.error('error parsing forecast');
                    console.error(err);
                    res.send(err);
                }
                else {
                    res.send(data);
                }
        });
    }
});

router.get('/api/xkcd', (req, res) => {
    console.log('loading xkcd');

    curl.request('http://xkcd.com/info.0.json', (err, data) => {
        if (err) {
            console.error('error loading xkcd')
            console.error(err);
            res.send(err);
        } else {
            console.log('getting the last xkcd...')
            var lastComicNumber = '';
            try {
                lastComicNumber = JSON.parse(data).num;
            } catch (error) {
                console.log('error parsing last xkcd... here was input:');
                console.dir(data);
                console.dir(error);
            }

            console.log('last xkcd published: ' + lastComicNumber);
            var randomComicNumber = Math.floor(Math.random() * lastComicNumber)
            console.log('random xkcd to show: ' + randomComicNumber);
            curl.request('http://xkcd.com/{0}/info.0.json'.replace('{0}', randomComicNumber), (err2, data2) => {
                if (err2) {
                    console.error(err2);
                    res.send(err2);
                } else {
                    res.send(data2);
                }
            });
        }
    });
});

router.get('/api/image', (req, res) => {
    console.log('getting /api/image...');
    const images = fs.readdirSync(path.join(__dirname, 'images'));
    const random = Math.floor(Math.random() * Math.floor(images.length - 1))
    const image = `images/${random}.jpg`;
    console.log('serving up ' + image);
    res.send(image);
});

router.get('/images/:image', (req, res) => {
    console.log('hitting: ' + req.url);
    const imageName = req.params.image;
    var stream = fs.createReadStream(path.join(__dirname, 'images', imageName));
    stream.on('open', function () {
        stream.pipe(res);
    });
});

app.use('/', router, (req, res) => {
    res.sendStatus(401);
});

app.listen(port, () => {
    console.dir('Server listening on port ' + port);
});