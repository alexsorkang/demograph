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
  var locations = db.collection('locations');

  ipget(ip, (err, result) => {
    if (ip != '::1') {
      locations.insert(result);
      locations.find().toArray((err1, result1) => {
        res.render('index', { data: result1 });
      })
    } else {
      locations.find().toArray((err1, result1) => {
      res.render('index', { data: result1 });
      })
    }

  })
});

module.exports = router;
