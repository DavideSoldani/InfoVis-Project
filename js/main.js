var graphs;
d3.json("js/json/graphs.json").then(function(data) {
  graphs=data;
  var example = graphs.simple_triangulation;
  drawGraph(example);
  var dropdown = document.getElementById("dropdown");
  for (var el in graphs){
    console.log(el);
    var tag = "<option value=" + el + ">" + el + "<//option>".toString();
    dropdown.innerHTML+=tag;
  }
});


function drawGraph(graph){
  var result_arcs = creaSchnyderRealizers(graph);
  find_coordinates(graph, result_arcs);
}

