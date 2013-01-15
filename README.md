# Student Default Cohort Rate Data Visualization
data set from: http://www2.ed.gov/offices/OSFAP/defaultmanagement/cdr.html


## Requires:

-	 Node.js
-	MongoDB

## MongoHQ:

- 	user: `cdr_admin`
-	password: phoenixITTKaplan _(worst 3 schools)_

## To Use:
-	run `npm install`
-	start mongodb `./mongod`
-	use `node utils/data/importer.js` to get data into mongodb 
-	start server `node app.js`
-	go to http://localhost:2800 
