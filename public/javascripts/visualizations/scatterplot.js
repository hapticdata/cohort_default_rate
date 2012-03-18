

d3.json('/all/json', function(data){

	var width = 960,
		height = 320,
		keys = {
			x: 'DRATE_1',
			y: 'NBD_1'
		},
		padding = {
			x: 0,
			y: 0
		},
		max = {};

	max[keys.x] = 0;
	max[keys.y] = 0;
	_.each(data, function(val,i){

		max[keys.x] = Math.max(val[keys.x],max[keys.x]);
		max[keys.y] = Math.max(val[keys.y],max[keys.y]);

	});


	
	console.log("max["+keys.x+"]: "+max[keys.x]);
	console.log("max["+keys.y+"]: "+max[keys.y]);


	var scalar = {
		x: width / max[keys.x],
		y: height / max[keys.y]
	};

	var	svg = d3.select("#chart")
			.append('svg')
			.attr('class', 'scatterplot')
			.attr('width', width + (padding.x*2))
			.attr('height', height + (padding.y*2));


	svg.selectAll('rect')
		.data(data)
		.enter()
		.append('circle')
		.attr('id', function(d){
			return d.NAME;
		})
		.attr('fill',function(d){
			switch(d.SCH_TYPE){

				case 'Pub':
					return 'rgba(255,0,0,0.5)';
				case 'Priv':
					return 'rgba(0,255,0,0.5)';
				case 'Prop':
					return 'rgba(0,0,255,0.5)';
				case 'Foreign':
					return 'rgba(0,255,255,0.5)';
				case 'Fpub':
					return 'rgba(255,255,0,0.5)';
				case 'Fpvt':
					return 'rgba(255,0,255,0.5)';
				case 'Ffp':
					return 'rgba(128,128,128,0.5)';
				default:
					console.log("something else: "+d.SCH_TYPE);

			} 
		})
		.attr('cx', function(d){
			return d[keys.x] * scalar.x + padding.x;
		})
		.attr('cy', function(d){
			return height - (d[keys.y] * scalar.y) + padding.y;
		})
		.attr('r', function(d){
			return 1.5; //Math.max(1,d.NBD_1 / 150);
		});
	
});