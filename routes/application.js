var express = require('express');
var router = express.Router();
var Application = require('../models/application');
var mongoose = require('mongoose');
var url = require('url');

mongoose.connect('mongodb://user1:user11@ds235461.mlab.com:35461/smartnotebook');


/* GET users listing. */
router.get('/user/', function(req, res, next) {
  console.log("in user get ")
  let url_parts = url.parse(req.url, true);
  let usId = url_parts.query.userId;
  Application.find({userId : usId}).then(data => res.status(200).json(data));
  });

/* GET users listing. */
router.get('/search', function(req, res, next) {
  let url_parts = url.parse(req.url, true);
  let usId = url_parts.query.userId;
  let searchString = url_parts.query.searchString;
  //console.log(searchString[userId]);
  const query = {"companyName" : {$regex : searchString, $options : "i"}, "userId" : usId};
  console.log("Query", query);
  Application.find(query).then(data => res.status(200).json(data));
  });

  /* GET users listing. */
router.get(' ', function(req, res, next) {
    Application.findById(req.param('id'))
                .then(data => res.status(200).json(data))
                .catch(err => res.status(500));
  });

/* POST new application */
router.post('/', function(req, res, next) {
  const application = new Application(req.body);
  application.save();
  res.status(200).json(application);
});

/* Update new application */
router.put('/', function(req, res, next) {
    const application = new Application(req.body);
    console.log(req.body.companyName);
    Application.findById(req.body._id, function(err, doc){
        if(err){
            res.status(500);
        }

        doc.companyName = req.body.companyName;
        doc.city = req.body.city;
        doc.userId = req.body.userId;
        doc.postWebsite = req.body.postWebsite;
        doc.jobDescription = req.body.jobDescription;
        doc.sourceOfJobPosting = req.body.sourceOfJobPosting;
        doc.email = req.body.email;
        doc.contactName = req.body.contactName;
        doc.phoneNumber = req.body.phoneNumber;
        doc.resumeVersion = req.body.resumeVersion;
        doc.followUps = req.body.followUps;
        doc.interviewDateTime = req.body.interviewDateTime;
        doc.notes = req.body.notes;
        
        doc.save();
    });
    res.status(200).json(application);
  });
  
  /*Delete application*/
router.delete('/:id', function(req, res, next) {                  ;
      Application.findById(req.body._id).then(
          data => {Application.deleteOne(data, function(err){
            res.status(200).json({"message": "Application Deleted", "data" : data });          
          })}
      ).catch(err => res.status(500).json(err));
  });

module.exports = router;
