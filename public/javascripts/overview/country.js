var data; // loaded asynchronously

var path = d3.geo.path();

var svg = d3.select("#chart")
  .append("svg");

var counties = svg.append("g")
    .attr("id", "counties")
    .attr("class", "Blues");

var states = svg.append("g")
    .attr("id", "states");

d3.json("/javascripts/data/us-counties.json", function(json) {
  counties.selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("class", data ? quantize : null)
      .attr("d", path);
});

d3.json("/javascripts/data/us-states.json", function(json) {
  states.selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("d", path);
});

d3.json("/zip/json", function(json) {
  data = json;
  console.log(json);
  counties.selectAll("path")
      .attr("class", quantize);
});

/*
function quantize(d) {
  return "q" + Math.min(8, ~~(data[d.id] * 9 / 12)) + "-9";
}*/

function quantize(d) {
  if( data[d.id] == undefined || data[d.id].DRATE_1 == undefined){
    console.log(d.id + " UNDEFINED");
    return "q0 "+d.id;
  }
  return "q" + Math.min(8, ~~(parseFloat(data[d.id].DRATE_1,10) * 9 / 12)) + "-9";
}