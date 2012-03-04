var	mongo = require('./db'),
	data = require('./cdr_data');

//insert all entries of the Cohort Default Rate Data file
mongo.init(function(err,sheet1){
	for(var i=0; i< data.length;i ++){
		sheet1.insert(data[i],function(err,inserted){
			if(err){
				console.log("Err: ",err);
			} else {
				console.log(" inserted :"+ i + " state: "+data[i].ST_DESC);
			}
		});
	}
});