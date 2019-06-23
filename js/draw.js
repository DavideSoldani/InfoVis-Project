let larghezza = window.innerWidth - 50;
let altezza = window.innerHeight - 50;
let offset = 20;



function draw(coordinates, arcs, animation){
    let svg = d3.select("#svg");
    svg.attr("width", larghezza).attr("height", altezza).style('border','2px solid black');

    let maxCoord = (nodeNumber - 2)*multiplier ;
    let latoGrafo = maxCoord + 50;
    svg.attr("viewBox","0 "+ (-maxCoord - offset) +" " + latoGrafo + " " + latoGrafo);

    svg.append("g")
        .attr("id","edges");
    svg.append("g")
        .attr("id","nodes");
    drawNodes(d3.select("#nodes"),coordinates);
    drawEdges(d3.select("#edges"),arcs,coordinates, animation);


}

function drawNodes(nodes_group,coordinates) {

    coordinates.forEach(function (element,index) {
        nodes_group.append("circle")
            .attr("cx", element[0])
            .attr("cy",  - element[1])
            .attr("r", 10)
            .attr("id", "node" + index)
            .style("stroke", "black")
            .style("stroke-width", "3px")
            .style("fill", "gray");

            nodes_group.append("text")
                .attr("x", element[0]-6)
                .attr("y", - element[1])
                .attr("dy", ".35em")
                .text(index.toString());
    });
}

function drawEdges(edges_group,arcs, coordinates, animation) {

    if (animation === "None") {

        arcs.forEach(function (element, index) {

            let startNode = coordinates[element.tail];
            let endNode = coordinates[element.arrow];

            let startX = startNode[0];
            let startY = -startNode[1];

            let endX = endNode[0];
            let endY = -endNode[1];


            if (element.tree === 0) {
                edges_group.append("path")
                    .attr("d", "M" + startX + " " + startY + " L" + endX + " " + endY)
                    .style("stroke", "blue")
                    .style("stroke-width", "3px");
            } else if (element.tree === 1) {
                edges_group.append("path")
                    .attr("d", "M" + startX + " " + startY + " L" + endX + " " + endY)
                    .style("stroke", "green")
                    .style("stroke-width", "3px");
            } else if (element.tree === coordinates.length - 1) {
                edges_group.append("path")
                    .attr("d", "M" + startX + " " + startY + " L" + endX + " " + endY)
                    .style("stroke", "red")
                    .style("stroke-width", "3px");
            } else {
                edges_group.append("path")
                    .attr("d", "M" + startX + " " + startY + " L" + endX + " " + endY)
                    .style("stroke", "black")
                    .style("stroke-width", "3px");
            }


        })
    }

    else if (animation === "Trees"){

        arcs.forEach(function (element) {

            let startNode = coordinates[element.tail];
            let endNode = coordinates[element.arrow];

            let startX = startNode[0];
            let startY = -startNode[1];

            let endX = endNode[0];
            let endY = -endNode[1];

            if (element.tree === -1) {
                edges_group.append("path")
                    .attr("d", "M" + startX + " " + startY + " L" + endX + " " + endY)
                    .style("stroke", "black")
                    .style("stroke-width", "3px");
            }
        });

        setTimeout(function(){
            arcs.forEach(function (element,index) {

                let startNode = coordinates[element.tail];
                let endNode = coordinates[element.arrow];

                let startX = startNode[0];
                let startY = -startNode[1];

                let endX = endNode[0];
                let endY = -endNode[1];
                if (element.tree === 0) {
                    edges_group.append("path")
                        .attr("d", "M" + startX + " " + startY + " L" + endX + " " + endY)
                        .style("stroke", "blue")
                        .style("stroke-width", "3px");
                }
            });
        }, 1000);


        setTimeout(function(){
            arcs.forEach(function (element,index) {

                let startNode = coordinates[element.tail];
                let endNode = coordinates[element.arrow];

                let startX = startNode[0];
                let startY = -startNode[1];

                let endX = endNode[0];
                let endY = -endNode[1];
                if (element.tree === 1) {
                    edges_group.append("path")
                        .attr("d", "M" + startX + " " + startY + " L" + endX + " " + endY)
                        .style("stroke", "green")
                        .style("stroke-width", "3px");
                }
            });

        }, 2000);

        setTimeout(function(){
            arcs.forEach(function (element,index) {

                let startNode = coordinates[element.tail];
                let endNode = coordinates[element.arrow];

                let startX = startNode[0];
                let startY = -startNode[1];

                let endX = endNode[0];
                let endY = -endNode[1];

                if (element.tree === coordinates.length - 1) {
                    edges_group.append("path")
                        .attr("d", "M" + startX + " " + startY + " L" + endX + " " + endY)
                        .style("stroke", "red")
                        .style("stroke-width", "3px");
                }
            });
        }, 3000);
    }
    else if (animation === "Edges"){
        arcs.forEach(function (element,index) {

            let startNode = coordinates[element.tail];
            let endNode = coordinates[element.arrow];

            let startX = startNode[0];
            let startY = -startNode[1];

            let endX = endNode[0];
            let endY = -endNode[1];


            if (element.tree === 0){
                edges_group.append("path")
                    .attr("d","M"+startX+" " + startY+ " L" + startX + " " + startY )
                    .style("stroke","blue")
                    .style("stroke-width","3px")
                    .transition().duration(2000).attr("d","M"+startX+" " + startY+ " L" + endX + " " + endY );
            }
            else if (element.tree === 1){
                edges_group.append("path")
                    .attr("d","M"+startX+" " + startY+ " L" + startX + " " + startY )
                    .style("stroke", "green")
                    .style("stroke-width", "3px")
                    .transition().duration(2000).attr("d","M"+startX+" " + startY+ " L" + endX + " " + endY );
            }
            else if (element.tree === coordinates.length -1){
                edges_group.append("path")
                    .attr("d","M"+startX+" " + startY+ " L" + startX + " " + startY )
                    .style("stroke", "red")
                    .style("stroke-width", "3px")
                    .transition().duration(2000).attr("d","M"+startX+" " + startY+ " L" + endX + " " + endY );
            }
            else{
                edges_group.append("path")
                    .attr("d","M"+startX+" " + startY+ " L" + endX + " " + endY )
                    .style("stroke", "black")
                    .style("stroke-width", "3px")
            }

        });
    }
    else if (animation === "Trees + Edges"){

        arcs.forEach(function (element) {

            let startNode = coordinates[element.tail];
            let endNode = coordinates[element.arrow];

            let startX = startNode[0];
            let startY = -startNode[1];

            let endX = endNode[0];
            let endY = -endNode[1];

            if (element.tree === -1) {
                edges_group.append("path")
                    .attr("d", "M" + startX + " " + startY + " L" + endX + " " + endY)
                    .style("stroke", "black")
                    .style("stroke-width", "3px");
            }
        });

        setTimeout(function(){
            arcs.forEach(function (element,index) {

                let startNode = coordinates[element.tail];
                let endNode = coordinates[element.arrow];

                let startX = startNode[0];
                let startY = -startNode[1];

                let endX = endNode[0];
                let endY = -endNode[1];
                if (element.tree === 0) {
                    edges_group.append("path")
                        .attr("d","M"+startX+" " + startY+ " L" + startX + " " + startY )
                        .style("stroke", "blue")
                        .style("stroke-width", "3px")
                        .transition().duration(1000).attr("d","M"+startX+" " + startY+ " L" + endX + " " + endY );
                }
            });
        }, 1000);


        setTimeout(function(){
            arcs.forEach(function (element,index) {

                let startNode = coordinates[element.tail];
                let endNode = coordinates[element.arrow];

                let startX = startNode[0];
                let startY = -startNode[1];

                let endX = endNode[0];
                let endY = -endNode[1];
                if (element.tree === 1) {
                    edges_group.append("path")
                        .attr("d","M"+startX+" " + startY+ " L" + startX + " " + startY )
                        .style("stroke", "green")
                        .style("stroke-width", "3px")
                        .transition().duration(1000).attr("d","M"+startX+" " + startY+ " L" + endX + " " + endY );
                }
            });

        }, 2000);

        setTimeout(function(){
            arcs.forEach(function (element,index) {

                let startNode = coordinates[element.tail];
                let endNode = coordinates[element.arrow];

                let startX = startNode[0];
                let startY = -startNode[1];

                let endX = endNode[0];
                let endY = -endNode[1];

                if (element.tree === coordinates.length - 1) {
                    edges_group.append("path")
                        .attr("d","M"+startX+" " + startY+ " L" + startX + " " + startY )
                        .style("stroke", "red")
                        .style("stroke-width", "3px")
                        .transition().duration(1000).attr("d","M"+startX+" " + startY+ " L" + endX + " " + endY );
                }
            });
        }, 3000);

    }
}

