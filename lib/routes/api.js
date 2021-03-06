var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');

var secret = config.secret;

module.exports = function(app, express){
  var apiRouter = express.Router();
  apiRouter.use; 

  apiRouter.get('/', function(req, res){
    res.json({message: 'welcome to our api'});
  });

  //create new user 
  apiRouter.route('/users')
    .post(function(req, res){
      console.log('in user post');
      var user = new User();
      user.email = req.body.email;
      user.password = req.body.password;

      user.save(function(err){
        if (err){
          if(err.code === 11000){
            return res.json({success: false, message: 'A user with that email already exists'});
          } else {
            return res.send(err);
          }
        }
        else {
          res.json({ message: 'User created!'});
        }
      })
    })


     var hourlyData;
    counter = 0;

    function getHourlyData(){
      request('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson', function(error, response, body){
        // console.log('served request at ', Date.now());
        console.log('/////////// fetched geojson data ////////////');
        hourlyData = body;
        console.log(hourlyData);
        console.log('****************************');
        console.log('++++++++++ ' + counter + ' ++++++++++++++');
        counter ++;
        // return hourlyData;
      })
    }

    getHourlyData();

    setInterval(getHourlyData, 20000);

    app.get('/api/data', function(req, res){
        res.send(hourlyData);
    })



  apiRouter.post('/authenticate', function(req, res){
    User.findOne({
      email: req.body.email
    }).select('email password').exec(function(err, user){
      console.log(user);
      if (err) throw err;

      if(!user){
        res.json({
          success: false,
          message: 'Authentication failed. User not found'
        });
      } else if (user) {
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword){
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password'
          })
        } else {
          var token = jwt.sign({
            userId: user._id,
            email: user.email
          }, secret, {
            expiresInMinutes: 1440
          });
          res.json({
            success: true,
            message: 'Enjoy your token',
            token: token
          });
        }
      }
    })
  })

  apiRouter.use(function(req, res, next){
    var token = req.body.token || req.params.token || req.headers['x-access-token'];
    if (token){
      jwt.verify(token, secret, function(err, decoded){
        if(err){
          return res.status(403).send({
            success: false,
            message: 'Failed to authenticate token'
          });
        } else {
          req.decoded = decoded;
          console.log(decoded);
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided'
      })
    }
  })

  apiRouter.get('/me', function(req, res){
    res.send(req.decoded);
  })

  apiRouter.route('/users')
    .get(function(req, res){
      User.find(function(err, users){
        if (err) res.send(err);
        res.json(users);
      })
    })

  apiRouter.route('/users/:user_id')
    .get(function(req, res){
      User.findById(req.params.user_id, function(err, user){
        if (err) res.send(err);
        res.json(user);
      })
    })
    .put(function(req, res){
      User.findById(req.params.user_id, function(err, user){
        if (err) res.send(err);

        if (req.body.name) user.name = req.body.name;
        if (req.body.username) user.username = req.body.username;
        if (req.body.password) user.password = req.body.password;

        user.save(function(err){
          if (err) res.send(err);
          res.json({message: "User updated"});
        });

      })
    })
    .delete(function(req, res){
      User.remove({
        _id: req.params.user_id
      }, function(err, user){
        if(err) return res.send(err);
        res.json({message: "successfully deleted"});
      })
    })

 return apiRouter;
}