var	db = require('./db'),
	data = require('./cdr_data');

var fields = {
	NBD_1: 		'Number of Borrowers in Default for 2009',
	NBR_1: 		'Number of Borrowers in Repay for 2009',
	DRATE_1: 	'Official Default Rate for 2009',
	NBD_2: 		'Number of Borrowers in Default for 2008',
	NBR_2: 		'Number of Borrowers in Repay for 2008',
	DRATE_2: 	'Official Default Rate for 2008',
	NBD_3: 		'Number of Borrowers in Default for 2007',
	NBR_3: 		'Number of Borrowers in Repay for 2007',
	DRATE_3: 	'Official Default Rate for 2007',
	AVGOR_GE30: 'Borrow Group Indicator (If 2009 rate is average and < 3 yrs data then 0 else 1)'
};

var convert = function(data){
	for(var i=0; i<data.length; i++){
		var item = data[i];
		for(var key in fields){
			item[key] = Number(item[key]);
		}
	}
};

//insert all entries of the Cohort Default Rate Data file
db.openSheet1(function(err,sheet1){
	for(var i=0; i< data.length;i ++){
		convert(data);
		sheet1.insert(data[i],function(err,inserted){
			if(err){
				console.log("Err: ",err);
			} else {
				console.log(" inserted :"+ i + " state: "+data[i].ST_DESC);
			}
		});
	}
});