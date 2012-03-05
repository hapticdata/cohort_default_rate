var	mongo = require('./mongoConnection'),
	Cursor = require('mongodb').Cursor;



var fields = {
	OPE_ID: 	'OPE ID',
	NAME: 		'Institution Name',
	ADDR: 		'Street Address',
	CITY: 		'City',
	ST_CD: 		'State Abbreviation',
	ST_DESC: 	'State Name',
	ZIP: 		'Zip Code',
	ZIP_EXT: 	'Zip Code Extension',
	Country: 	'Country Name of foreign schools',
	PGM_LEN: 	'Program Length (Bachelor, Master, Associate, etc.)',
	SCH_TYPE: 	'School Type (Public, Private, Proprietary, Foreign, etc.)',
	YR_1: 		'Cohort Year 2009',
	NBD_1: 		'Number of Borrowers in Default for 2009',
	NBR_1: 		'Number of Borrowers in Repay for 2009',
	DRATE_1: 	'Official Default Rate for 2009',
	AVG_1: 		'Average Rate Indicator for 2009',
	PRATE_1: 	'Rate Program Type for 2009',
	YR_2: 		'Cohort Year 2008',
	NBD_2: 		'Number of Borrowers in Default for 2008',
	NBR_2: 		'Number of Borrowers in Repay for 2008',
	DRATE_2: 	'Official Default Rate for 2008',
	AVG_2: 		'Average Rate Indicator for 2008',
	PRATE_2: 	'Rate Program Type for 2008',
	YR_3: 		'Cohort Year 2007',
	NBD_3: 		'Number of Borrowers in Default for 2007',
	NBR_3: 		'Number of Borrowers in Repay for 2007',
	DRATE_3: 	'Official Default Rate for 2007',
	AVG_3: 		'Average Rate Indicator for 2007',
	PRATE_3: 	'Rate Program Type for 2007',
	Eth_Cert: 	'Ethnic Code or No Longer in FFEL Program (Code "C", "H", "T", or blank)[C=No Longer in FFEL Program; H=HBCU; T=TCCC]',
	PROGRAM: 	'F=FFEL Participation; D=Direct Loan Program Participation; B=Participation in both Programs',
	CON_DIST: 	'Congressional District',
	REGION: 	'Region',
	AVGOR_GE30: 'Borrow Group Indicator (If 2009 rate is average and < 3 yrs data then 0 else 1)'
};

var states = {
	AL: "Alabama", 
	AK: "Alaska", 
	AZ: "Arizona", 
	AR: "Arkansas", 
	CA: "California", 
	CO: "Colorado", 
	CT: "Connecticut", 
	DE: "Delaware", 
	DC: "District Of Columbia", 
	FL: "Florida", 
	GA: "Georgia", 
	HI: "Hawaii", 
	ID: "Idaho", 
	IL: "Illinois", 
	IN: "Indiana", 
	IA: "Iowa", 
	KS: "Kansas", 
	KY: "Kentucky", 
	LA: "Louisiana", 
	ME: "Maine", 
	MD: "Maryland", 
	MA: "Massachusetts", 
	MI: "Michigan", 
	MN: "Minnesota", 
	MS: "Mississippi", 
	MO: "Missouri", 
	MT: "Montana",
	NE: "Nebraska",
	NV: "Nevada",
	NH: "New Hampshire",
	NJ: "New Jersey",
	NM: "New Mexico",
	NY: "New York",
	NC: "North Carolina",
	ND: "North Dakota",
	OH: "Ohio", 
	OK: "Oklahoma", 
	OR: "Oregon", 
	PA: "Pennsylvania", 
	RI: "Rhode Island", 
	SC: "South Carolina", 
	SD: "South Dakota",
	TN: "Tennessee", 
	TX: "Texas", 
	UT: "Utah", 
	VT: "Vermont", 
	VA: "Virginia", 
	WA: "Washington", 
	WV: "West Virginia", 
	WI: "Wisconsin", 
	WY: "Wyoming"
};


mongo.open(function(err,db){
	console.log("open");
	db.collection('main',function(err,collection){
		exports.getNHighestDefaults = function(n, callback){
			collection.find({}).sort({NBD_1: -1}).limit(n).toArray(callback);
		};
		exports.getNHighestPercent = function(n, callback){
			collection.find({NBD_1: {$gt: 0}}).sort({DRATE_1: -1}).limit(n).toArray(callback);
		};
		exports.getNLowestDefaults = function(n, callback){
			collection.find({}).sort({NBD_1: 1}).limit(n).toArray(callback);
		}
		exports.getState = function(st, callback){
			st = st.toUpperCase();
			collection.find({ST_CD: st}).sort({NAME: 1}).toArray(callback);
		};
	});

	db.collection('states', function(err,collection){
		exports.getStates = function(callback){
			collection.find({}, function(err,cursor){
				var obj = {};
				cursor.each(function(err,item){
					if(item != null){
						obj[item._id] = item.value.ST_DESC;
					}
					if(cursor.state == Cursor.CLOSED){
						callback(err,obj);
					}
				})
			});
		};
	});

	db.collection('state_averages', function(err, collection){
		exports.getStateAverages = function(cb){
			var callbackSent = false;
			collection.find({}).sort({"value.DRATE_1": 1}, function(err,cursor){
				var obj = {};
				cursor.each(function(err, item){
					if(item != null){
						obj[item._id] = {DRATE_1: item.value.DRATE_1, DRATE_2: item.value.DRATE_2, DRATE_3: item.value.DRATE_3};
					}
					if(!callbackSent && cursor.state == Cursor.CLOSED){
						cb(err,obj);
						callbackSent = true;
					}
				});
			});
		};

	});

	db.collection('zip_averages', function(err,collection){
		exports.getZipAverages = function(cb){
			var callbackSent = false;
			collection.find({},{},function(err,cursor){
				var obj = {};
				cursor.each(function(err,item){
					if(item != null){
						//console.log(item._id);
						obj[item._id] = {DRATE_1: item.value.DRATE_1, DRATE_2: item.value.DRATE_2, DRATE_3: item.value.DRATE_3};
						//console.log("obj["+item._id+"] = " + obj[item._id]);
					}
					//TODO verify this is the right way to know when it is the last item
					if(!callbackSent && cursor.state == Cursor.CLOSED){
						console.log("CALL");
						cb(err,obj); 
						callbackSent = true;
					}
				});
			});
		};
	});
});
