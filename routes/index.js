var express = require('express');
var ipget = require('iplocation');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
     ipget(ip, (err, result) => {
      console.log(result)
      res.render('index', { title: ip });
     })
});

module.exports = router;
