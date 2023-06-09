var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var sqlite3 = require('sqlite3');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var db = require('knex')({
        client: 'sqlite3',
        connection: {
            filename: 'db_m4.db'
        }
    }
);


/*

app.use('/', indexRouter);
app.use('/users', usersRouter);

*/

app.get('/api/eventos',function (req,res){
    db.select('e.id_evento','e.nombre','e.fecha','e.recinto','e.descripcion','e.precio','e.aforo','e.imagen')
        .from('eventos as e')
        .then(function (data){
            result ={}
            result.eventos = data;
            res.json(result)
        }).catch(function (error){
        console.log(error)
    });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
