let graphs;
d3.json("js/json/graphs.json").then(function(data) {
  graphs=data;
  let dropdown = document.getElementById("dropdown");
  for (let el in graphs){
    let tag = "<option value=" + el + ">" + el + "<//option>".toString();
    dropdown.innerHTML+=tag;
  }
});


function drawGraph(graph, animation){
  let result_arcs = creaSchnyderRealizers(graph);
  find_coordinates(graph, result_arcs, animation);
}


function drawIt(){
  let animation = document.getElementById("dropdown_animation").value;
  let value = document.getElementById("dropdown").value;
  d3.select("svg").selectAll("*").remove();
  drawGraph(graphs[value.toString()], animation);

}



