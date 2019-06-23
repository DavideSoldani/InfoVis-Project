var graphs;
d3.json("js/json/graphs.json").then(function(data) {
  graphs=data;
  var example = graphs.simple_triangulation;
  //var example = graphs.nine_degree;
  // var example = graphs.eleven_degree;
  //var example = graphs.sixteen_degree;

  drawGraph(example);
});


function drawGraph(graph){
  var result_arcs = creaSchnyderRealizers(graph);
  find_coordinates(graph, result_arcs);
}

