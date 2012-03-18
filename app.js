
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , cdrModel = require('./models/cdrModel');


var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false, pretty: true, debug: false});
  app.use(express.compiler({ src: __dirname+'/public', enable: ['less']}));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req,res,next){
  cdrModel.getNHighestDefaults(50, function(err, worst){
    cdrModel.getNHighestPercent(50, function(err, worstPercent){
        res.render('index', {title: "Which School's Students are Failing to Pay their Student Loans?", worst: worst, worstPercent: worstPercent});
    });
  })
});
app.get('/all/json', function(req,res,next){
  cdrModel.getAll(function(err,schools){
      res.send(schools);
  });
});
app.get('/state', function(req,res, next){
  cdrModel.getStates(function(err,states){
    cdrModel.getStateAverages(function(err,averages){
      for(var key in averages){
        averages[key].ST_DESC = states[key];
      }
      res.render('state/index',{title: "Student Default Rates all states", data: averages});
    });
  });
});
app.get('/state/json', function(req,res,next){
  cdrModel.getStateAverages(function(err, data){
      res.send(data);
  });
});
app.get('/zip/json', function(req,res,next){
  console.log("PAGE REQUEST");
  cdrModel.getZipAverages(function(err,data){
    console.log("request");
    res.send(data);
  });
});
app.get('/state/:code', function(req,res,next){
  var stateCode = req.params.code;
  cdrModel.getState(stateCode, function(err,data){
    console.log("get state: "+stateCode);
    res.render('state/single',{title: "Student Default Rates for "+ data[0].ST_DESC, data: data});
  });
});
app.get('/state/:code/json', function(req,res,next){
  var stateCode = req.params.code;
  cdrModel.getState(stateCode, function(err, data){
    res.send(data);
  });
});


app.listen(process.env.PORT || 2800);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
