var express = require('express');
var app = express();

var port = 3000;

app.set('port', port);
app.use(express.static(__dirname + '/app'));

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});