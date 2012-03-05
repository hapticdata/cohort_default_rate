var dbModel = require('./db');

dbModel.openSheet1(function(err,collection){
	var command = { 
			mapreduce: "sheet1", 
			out: {replace: "states"}, 
			query: {},
			map: (function(){ 
				emit(this.ST_CD,{
					ST_DESC: this.ST_DESC
				}); 
			}).toString(), 
			reduce: (function(key, values) {
				var result = {ST_DESC: ""};

				for(var i=0; i< values.length; i++){
					var value = values[i];
					result.ST_DESC = value.ST_DESC;
				}

				return result;
			}).toString()
	} ;



	dbModel.db.executeDbCommand(command, function(err, dbres) { 
		console.log(dbres);
			//res.write( sys.inspect(err) + "\n\n"); 
			//res.write( sys.inspect(dbres) + "\n\n"); 
			//res.end(); 
		dbModel.db.collection('states', function(err, collection){
			collection.update({_id: 'ZZ'},{$set: {NAME: 'International'}}, function(err, updated){
				if(err){
					console.log("Error renaming ZZ");
				} else {
					console.log("provided ZZ with the name International");
				}
			})
		});
		
	});
});