var express = require('express');
var router = express.Router();
var User = require('../models/users');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

//database connection using mlab which is done by mongoose
mongoose.connect('mongodb://user1:user11@ds235461.mlab.com:35461/smartnotebook');


 /* GET users listing. */
 router.get('/:id',ensureToken, authorization, function(req, res, next) {

  console.log("try again")
  User.findById(req.param('id'))
                .then(data => res.status(200).json(data))
                .catch(err => res.status(500));
  });

  function authorization(req, res, next){
    console.log("In authorization");
    jwt.verify(req.token, "my_secret_key", function(err, data){
      if(err){
        res.send('Forbidden');
      }
      
      next();
    });
  }

  function ensureToken(req, res, next) {
    console.log("In ensure token");
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }






module.exports = router;
