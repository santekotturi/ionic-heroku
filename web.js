var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
// console.log(__dirname);
// app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.use(gzippo.staticGzip("" + __dirname + "/www"));
app.listen(process.env.PORT || 5000);

