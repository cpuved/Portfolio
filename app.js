var hbs = require('express-hbs');
var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var index = require('./routes/index');
var shop = require('./routes/shop');
var about = require('./routes/about');
var work = require('./routes/work');
var contact = require('./routes/contact');

var app = express();

var port = 80;

var server = http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('port', port);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));

app.engine('hbs', hbs.express4({
    defaultLayout: path.join(__dirname, '/views/layout.hbs'),
    partialsDir: path.join(__dirname, '/views/partials')
}));

app.use('/', index);
app.use('/shop', shop);
app.use('/about-me', about);
app.use('/my-work', work);
app.use('/contact-me', contact);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

server.listen(port);

module.exports = app;
