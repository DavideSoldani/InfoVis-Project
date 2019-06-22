var larghezza = window.innerWidth - 50;
var altezza = window.innerHeight - 50;
var multiplier = 50;
var offsetX = 100;
var offsetY = 700;



function draw(coordinates, arcs){
    var svg = d3.select("#svg");
    svg.attr("width", larghezza).attr("height", altezza).style('border','2px solid black');

    drawEdges(svg,arcs,coordinates);
    drawNodes(svg,coordinates);


}

function drawNodes(svg,coordinates) {

    coordinates.forEach(function (element,index) {
        svg.append("circle")
            .attr("cx", offsetX + (element[0] ) * multiplier)
            .attr("cy", offsetY - (element[1]) * multiplier)
            .attr("r", 15)
            .attr("id", "node" + index)
            .style("stroke", "black")
            .style("stroke-width", "5px")
            .style("fill", "gray");
    });
}


function drawEdges(svg,arcs, coordinates) {

    arcs.forEach(function (element,index) {

        var startNode = coordinates[element.tail];
        var endNode = coordinates[element.arrow];

        startX = offsetX + (startNode[0]) * multiplier;
        startY = offsetY - (startNode[1]) * multiplier;

        endX = offsetX + endNode[0]* multiplier;
        endY = offsetY - endNode[1]* multiplier;


        if (element.tree === 0){
            svg.append("path")
                .attr("d","M"+startX+" " + startY+ " L" + endX + " " + endY )
                .style("stroke","blue")
                .style("stroke-width","5px");
        }
        else if (element.tree === 1){
            svg.append("path")
                .attr("d", "M" + startX + " " + startY + " L" + endX + " " + endY)
                .style("stroke", "green")
                .style("stroke-width", "5px");
        }
        else if (element.tree === coordinates.length -1){
            svg.append("path")
                .attr("d", "M" + startX + " " + startY + " L" + endX + " " + endY)
                .style("stroke", "red")
                .style("stroke-width", "5px");
        }
        else{
            svg.append("path")
                .attr("d", "M" + startX + " " + startY + " L" + endX + " " + endY)
                .style("stroke", "black")
                .style("stroke-width", "5px");
        }


    })
}



//     var esterni = [];
//     arcs.forEach(function (element) {
//         element.printArc();
//         if (element.tree === -1){
//             arcs.push(element);
//
//         }
//         var svg = d3.select("#svg");
//
//         svg.attr("width", window.innerWidth - 30).attr("height", window.innerHeight - 30).style('border','2px solid black');
//
//         svg.append("circle")
//             .attr("cx",offset + (node_number-1)*multiplier)
//             .attr("cy",offset)
//             .attr("r",20)
//             .style("stroke","black")
//             .style("stroke-width","5px")
//             .attr("fill","none");
//
//         // svg.append("text")
//         //     .attr("x",offset + (node_number-2)*multiplier - fontsize/3)
//         //     .attr("y",offset + 100 + fontsize/3)
//         //     .attr("font-size", 28)
//         //     .text("8");
//
//         svg.append("circle")
//             .attr("cx",offset)
//             .attr("cy",offset + (node_number-1)*multiplier)
//             .attr("r",20)
//             .style("stroke","black")
//             .style("stroke-width","5px")
//             .attr("fill","none");
//
//         svg.append("circle")
//             .attr("cx",offset)
//             .attr("cy",offset)
//             .attr("r",20)
//             .style("stroke","black")
//             .style("stroke-width","5px")
//             .attr("fill","none");
//     });
// }
