var express = require('express');
var ipget = require('iplocation');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;


  // { ip: '172.88.99.210',
  // country_code: 'US',
  // country_name: 'United States',
  // region_code: 'CA',
  // region_name: 'California',
  // city: 'Los Angeles',
  // zip_code: '90004',
  // time_zone: 'America/Los_Angeles',
  // latitude: 34.0762,
  // longitude: -118.3104,
  // metro_code: 803 }

  // { ip: '118.37.125.159',
  // country_code: 'KR',
  // country_name: 'Republic of Korea',
  // region_code: '11',
  // region_name: 'Seoul',
  // city: '',
  // zip_code: '',
  // time_zone: 'Asia/Seoul',
  // latitude: 37.5216,
  // longitude: 126.8583,
  // metro_code: 0 }

  // { ip: '176.144.16.109',
  // country_code: 'FR',
  // country_name: 'France',
  // region_code: 'HDF',
  // region_name: 'Hauts-de-France',
  // city: 'Beauvais',
  // zip_code: '60000',
  // time_zone: 'Europe/Paris',
  // latitude: 49.4333,
  // longitude: 2.0833,
  // metro_code: 0 }

  // { ip: '161.109.90.52',
  // country_code: 'US',
  // country_name: 'United States',
  // region_code: 'TX',
  // region_name: 'Texas',
  // city: 'Waco',
  // zip_code: '76705',
  // time_zone: 'America/Chicago',
  // latitude: 31.6286,
  // longitude: -97.0989,
  // metro_code: 625 }


  ipget(ip, (err, result) => {
    console.log(result)
    res.render('index', { title: ip });
  })
});

module.exports = router;
