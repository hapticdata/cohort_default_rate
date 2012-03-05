
var width = 940,
	height = 320,
	unit = height / 25,
	dataObject = {
		"1988": 17.2,
		"1989": 21.4,
		"1990": 22.4,
		"1991": 17.8,
		"1992": 15,
		"1993": 11.6,
		"1994": 10.7,
		"1995": 10.4,
		"1996": 9.6,
		"1997": 8.8,
		"1998": 6.9,
		"1999": 5.6,
		"2000": 5.9,
		"2001": 5.4,
		"2002": 5.2,
		"2003": 4.5,
		"2004": 5.1,
		"2005": 4.6,
		"2006": 5.2,
		"2007": 6.7,
		"2008": 7.0,
		"2009": 8.8
	},
	data= (function(){
		var d = [];
		for(var p in dataObject){
			d.push({year: p, value: dataObject[p]})
		}
		return d;
	}()),
	barWidth = (width / data.length) - 1;

var	svg = d3.select("#chart")
			.append('svg')
			.attr('class', 'bars')
			.attr('width', width)
			.attr('height', height);


svg.selectAll('rect')
	.data(data)
	.enter()
	.append('rect')
	.attr('class','bar')
	.attr('x', function(d,i){
		return i * (barWidth+1);
	})
	.attr('width', barWidth)
	.attr('y',height)
	.transition().duration(1000)
	.attr('y', function(d){
		return height - (d.value * unit);
	})
	.attr('height', function(d){
		return d.value * unit;
	});

svg.selectAll('text')
	.data(data)
	.enter()
	.append('text')
	.attr('class','label')
	.text(function(d){
		return d.year;
	})
	.attr('x', function(d,i){
		return i * (barWidth + 1) + 3;
	})
	.attr('y', function(d){
		return height - 2;
	});