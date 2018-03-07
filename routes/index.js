var express = require('express');
var router = express.Router();
var connection = require('./connection.js');
var Request = require('tedious').Request;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title:'Cloud Assignment 4' });
});

router.get('/loadstar', function(req, res, next) {
  var query = "LOAD DATA LOCAL INFILE '/var/lib/mysql/Starbucks.csv' INTO TABLE Starbucks FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' LINES TERMINATED BY '\r\n' IGNORE 1 LINES (id,StarbucksId,Name,StoreNumber,PhoneNumber,Street1,Street2,Street3,city,CountrySubdivisionCode,CountryCode,PostalCode,@Longitude,@Latitude,Timezone)SET Longitude = nullif(@Longitude,' '),Latitude = nullif(@Latitude,' ');";
  start = new Date().getTime();

  connection.query(query, function(err, rows, fields) {
    end = new Date().getTime();
    diff = (end-start)/1000 + 'sec';
    if (!err){
      res.send('success. The time taken for execution is: '+diff);
    }
    else{
      console.log('error %o',err);
      res.send('error '+diff);
    }
  });
});

router.get('/countrypie', function(req, res, next) {
  var q = "select count(*) as count,CountryCode from Starbucks group by CountryCode limit 10";
  start = new Date().getTime();
  console.log('start = '+start);

  connection.query(q, function(err, rows, fields) {
    end = new Date().getTime();
    console.log('end = '+end);

    diff = (end-start)/1000 + 'sec';
    if (!err){
      console.log('%o',rows);
      res.json(rows);
      //res.send('success. The time taken for execution is: '+diff);
    }
    else{
      console.log('error %o',err);
      res.send('error '+diff);
    }
  });

  console.log('am here - '+q);
});

router.post('/satavgpie', function(req, res, next) {
  var s = req.body.start;
  var e = req.body.end;

  var q = "select avg(sat_avg) as avg,state from Education where unitid between "+s+" and "+e+" group by state limit 10";
  start = new Date().getTime();
  console.log('start = '+start);

    connection.query(q, function(err, rows, fields) {
      end = new Date().getTime();
      console.log('end = '+end);

      diff = (end-start)/1000 + 'sec';
      if (!err){
        console.log('%o',rows);
        res.json(rows);
        //res.send('success. The time taken for execution is: '+diff);
      }
      else{
        console.log('error %o',err);
        res.send('error '+diff);
      }
    });
});

router.post('/earthquake', function(req, res, next) {
  var longitude = req.body.longitude;
  var latitude = req.body.latitude;
  var mag = req.body.mag;
  var net = req.body.net;
  var place = req.body.place;
  var query = "Select * from earthquake where ";
  var count=0;
  if(longitude){
    query=query+" longitude="+longitude;
    count++;

  }
  if(latitude){
    if(count>0)
    query=query+" and latitude="+latitude;
    else
    query=query+" latitude="+latitude;
  count++;

  }
  if(mag){
    if(count>0)
    query=query+" and mag="+mag;
    else
    query=query+" mag="+mag; 
  count++; 
  
  }
  
  if(net){
    if(count>0)
    query=query+" and net='"+net+"'";
    else
    query=query+" net='"+net+"'"; 
  count++; 
  }

  if(place){
    if(count>0)
    query=query+" and place='"+place+"'";
    else
    query=query+" place='"+place+"';"; 
  count++; 
  }
  start = new Date().getTime();

  connection.query(query, function(err, rows, fields) {
    end = new Date().getTime();
    diff = (end-start)/1000 + 'sec';
    if (!err){
      res.render('index.pug',{rows: rows});
    }
    else{
      console.log('error %o',err);
      res.send('error '+diff);
    }
  });

});

module.exports = router;