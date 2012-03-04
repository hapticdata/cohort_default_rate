var dbModel = require('./db');

dbModel.openSheet1(function(err,collection){
	var command = { 
	        mapreduce: "sheet1", 
	        out: {replace: "zip_averages"}, 
	        query: {},
	        map: (function(){ 
	        	emit(this.ZIP,{
	        		DRATE_1: this.DRATE_1,
	        		DRATE_2: this.DRATE_2,
	        		DRATE_3: this.DRATE_3 
	        	}); 
	        }).toString(), 
	        reduce: (function(key, values) {
	        	var zip = {DRATE_1: 0, DRATE_2: 0, DRATE_3: 0, ZIP: key};

				values.forEach(function(value){
					zip.DRATE_1 += parseFloat(value.DRATE_1,10);
					zip.DRATE_2 += parseFloat(value.DRATE_2,10);
					zip.DRATE_3 += parseFloat(value.DRATE_3,10);
				});

				zip.DRATE_1 /= values.length;
				zip.DRATE_2 /= values.length;
				zip.DRATE_3 /= values.length;

				return zip;
	        }).toString()
	} ;



	dbModel.db.executeDbCommand(command, function(err, dbres) { 
		console.log(dbres);
	        //res.write( sys.inspect(err) + "\n\n"); 
	        //res.write( sys.inspect(dbres) + "\n\n"); 
	        //res.end(); 
	});
});