var express = require('express')
    , morgan = require('morgan')
    , config = require('./config')
    , mongoose = require('mongoose')
    , bodyParser = require('body-parser')
    , app = express()
    , cors = require('cors')
    , bcrypt = require('bcrypt-nodejs')
    , request = require('request')
    , jwt = require('jsonwebtoken')
    , usgs = require('./lib/data/usgs.js')
    , User = require('./lib/models/user');

// app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.connect(config.database);

var apiRoutes = require('./lib/routes/api')(app, express);
app.use('/api', apiRoutes);



app.listen(config.port);

