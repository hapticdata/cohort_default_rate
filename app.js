
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
  app.set('view options', {layout: false, pretty: true, debug: true});
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

app.get('/', routes.index);
app.get('/state', function(req,res, next){
  cdrModel.getStates(function(err,data){
      res.render('state/index',{title: "Student Default Rates all states", data: data});
  });
});
app.get('/state/:code', function(req,res,next){
  var stateCode = req.params.code;
  cdrModel.getState(stateCode, function(err,data){
    res.render('state/single',{title: "Student Default Rates for "+ data[0].ST_DESC, data: data});
  });
});
app.get('/state/:code/json', function(req,res,next){
  var stateCode = req.params.code;
  cdrModel.getState(stateCode, function(err, data){
    res.send(data);
  });
});


app.listen(2800);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
