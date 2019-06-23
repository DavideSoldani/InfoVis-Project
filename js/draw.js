var larghezza = window.innerWidth - 50;
var altezza = window.innerHeight - 50;
var offset = 20;



function draw(coordinates, arcs){
    var svg = d3.select("#svg");
    svg.attr("width", larghezza).attr("height", altezza).style('border','2px solid black');

    var maxCoord = (nodeNumber - 2)*multiplier ;
    console.log(maxCoord);
    var latoGrafo = maxCoord + 50;
    svg.attr("viewBox","0 "+ (-maxCoord - offset) +" " + latoGrafo + " " + latoGrafo);

    drawEdges(svg,arcs,coordinates);
    drawNodes(svg,coordinates);


}

function drawNodes(svg,coordinates) {

    coordinates.forEach(function (element,index) {
        svg.append("circle")
            .attr("cx", element[0])
            .attr("cy",  - element[1])
            .attr("r", 10)
            .attr("id", "node" + index)
            .style("stroke", "black")
            .style("stroke-width", "3px")
            .style("fill", "gray");

            svg.append("text")
                .attr("x", element[0]-6)
                .attr("y", - element[1])
                .attr("dy", ".35em")
                .text(index.toString());
    });
}

function drawEdges(svg,arcs, coordinates) {

    arcs.forEach(function (element,index) {

        var startNode = coordinates[element.tail];
        var endNode = coordinates[element.arrow];

        startX = startNode[0];
        startY = -startNode[1];

        endX = endNode[0];
        endY = -endNode[1];


        if (element.tree === 0){
            svg.append("path")
                .attr("d","M"+startX+" " + startY+ " L" + endX + " " + endY )
                .style("stroke","blue")
                .style("stroke-width","3px");
        }
        else if (element.tree === 1){
            svg.append("path")
                .attr("d", "M" + startX + " " + startY + " L" + endX + " " + endY)
                .style("stroke", "green")
                .style("stroke-width", "3px");
        }
        else if (element.tree === coordinates.length -1){
            svg.append("path")
                .attr("d", "M" + startX + " " + startY + " L" + endX + " " + endY)
                .style("stroke", "red")
                .style("stroke-width", "3px");
        }
        else{
            svg.append("path")
                .attr("d", "M" + startX + " " + startY + " L" + endX + " " + endY)
                .style("stroke", "black")
                .style("stroke-width", "3px");
        }


    })
}

