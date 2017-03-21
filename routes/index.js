var express = require('express');
var ipget = require('iplocation');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;


  ipget(ip, (err, result) => {
    if (ip != '::1') {
      var locations = db.collection('locations');
      locations.insert(result);
      locations.find().toArray((err1, res) => {
        res.render('index', { data: res });
      })
    } else {
      var locations = db.collection('locations');
      locations.find().toArray((err1, result) => {
      res.render('index', { data: result });
      })
    }

  })
});

module.exports = router;
