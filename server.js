var express = require('express')
    , morgan = require('morgan')
    , config = require('./config')
    , bodyParser = require('body-parser')
    , app = express()
    , passport = require('passport')
    , LocalStrategy = require('passport-local')
    , GoogleStrategy = require('passport-google')
    , cors = require('cors'); 

app.use(cors());

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.json());



app.listen(config.port);