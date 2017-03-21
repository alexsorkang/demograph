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

  // first get the number of same entries
  locations.find({ip:ip}).count().then((d) => {
    console.log(d)
    // if same entries exist or ip is local, display existing data
    if (d != 0 || ip == '::1') {
      locations.find().toArray((err1, result1) => {
        res.render('index', { data: result1 });
      })
    // else store new data
    } else {
      ipget(ip, (err, result) => {
        locations.insert(result);
        locations.find().toArray((err1, result1) => {
          res.render('index', { data: result1 });
        })
      })
    }
  })
});

module.exports = router;
