var dbModel = require('./db');

dbModel.openSheet1(function(err,collection){
	var command = { 
	        mapreduce: "main", 
	        out: {replace: "state_averages"}, 
	        query: {},
	        map: (function(){ 
	        	emit(this.ST_CD,{
	        		DRATE_1: Number(this.DRATE_1),
	        		NBD_1: this.NBD_1,
	        		DRATE_2: Number(this.DRATE_2),
	        		NBD_2: this.NBD_2,
	        		DRATE_3: Number(this.DRATE_3),
	        		NBD_3: this.NBD_3
	        	}); 
	        }).toString(), 
	        reduce: (function(key, values) {
	        	var result = {DRATE_1: 0, NBD_1: 0, DRATE_2: 0, NBD_2: 0, DRATE_3: 0, NBD_3: 0, ST_CD: key};

	        	for(var i=0; i< values.length; i++){
					var value = values[i];
					if(typeof value.NBD_1 != "number"){
						print("invalid NBD: "+value.NBD_1);
					}
					result.DRATE_1 += Number(value.DRATE_1);
					result.NBD_1 += value.NBD_1;
					result.DRATE_2 += Number(value.DRATE_2);
					result.NBD_2 += value.NBD_2;
					result.DRATE_3 += Number(value.DRATE_3);
					result.NBD_3 += value.NBD_3;
				}

				result.DRATE_1 /= values.length;
				result.DRATE_2 /= values.length;
				result.DRATE_3 /= values.length;

				return result;
	        }).toString()
	} ;



	dbModel.db.executeDbCommand(command, function(err, dbres) { 
		console.log(dbres);
	        //res.write( sys.inspect(err) + "\n\n"); 
	        //res.write( sys.inspect(dbres) + "\n\n"); 
	        //res.end(); 
	});
});