var graphs;
d3.json("js/json/graphs.json").then(function(data) {
  graphs=data;
  var example = graphs.simple_traingulation;
  //var example = graphs.nine_degree;
  // var example = graphs.eleven_degree;
  //var example = graphs.sixteen_degree;
  var result_arcs = creaSchnyderRealizers(example);
  find_coordinates(example, result_arcs);
});




