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

    if (animation === "Compression + Expansion"){
        compressionAndExpansion(coordinates, arcs);

    }
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
            .attr("id", "text" + index)
            .attr("dy", ".35em")
            .text(index.toString());
    });
}

function getColor(arc) {

   if (arc.tree === -1){
       return "black";
   }
   else if(arc.tree === 0){
       return "blue";
   }
   else if (arc.tree === 1){
       return "green";
   }
   else return "red";

}

function compressionAndExpansion(coordinates, arcs) {


    for (let i = 0; i < nodeNumber - 1; i++){
        let index = nodeNumber-1-i;
        let currentNode = d3.select("#node" + index);
        let currentText = d3.select("#text" + index);

        let oldX = currentNode.attr("cx");
        let oldY = currentNode.attr("cy");

        //compressione
        setTimeout(function () {
            if (index !== 0 && index !== 1 && index !== coordinates.length-1) {
                currentNode.attr("class","locked");
                currentNode.transition().duration(1000).attr("cx", coordinates[nodeNumber-1][0]).attr("cy", -coordinates[nodeNumber - 1][1]);
                currentText.transition().duration(1000).attr("x", coordinates[nodeNumber-1][0] - 6).attr("y", -coordinates[nodeNumber - 1][1]);

                arcs.forEach(function (element) {
                    if (element.tail === index){
                        let currentEdge = d3.select("#edge"+element.tail+"-"+element.arrow);
                        let path = currentEdge.attr("d");
                        let end = "L"+ path.split("L")[1];
                        let newpath = "M"+ coordinates[nodeNumber-1][0]+ " "+coordinates[nodeNumber-1][1] + " "+ end;
                        currentEdge.transition().duration(1000).attr("d", newpath);
                    }
                    else if(element.arrow === index && element.tail !== 0 && element.tail !== 1 && element.tail !== coordinates.length-1){
                        let currentEdge = d3.select("#edge"+element.tail+"-"+element.arrow);
                        let path = currentEdge.attr("d");
                        let start = path.split("L")[0];
                        let newpath = start + " L" +coordinates[nodeNumber-1][0]+ " "+coordinates[nodeNumber-1][1];
                        currentEdge.transition().duration(1000).attr("d", newpath);
                    }
                });

            }
        }, (i+1)*1000);

        //espansione
        setTimeout(function () {
            let wrong_arcs = [];

            currentText.transition().duration(1000).attr("x", oldX-6).attr("y", oldY);

            arcs.forEach(function (element) {

                let startNode = coordinates[element.tail];
                let endNode = coordinates[element.arrow];

                let endNodeSVG = d3.select("#node" + element.arrow);

                let startX = startNode[0];
                let startY = -startNode[1];

                let endX = endNode[0];
                let endY = -endNode[1];



                if (element.tail === index){
                    let currentEdge = d3.select("#edge"+element.tail+"-"+element.arrow);
                    let path = currentEdge.attr("d");
                    let end = "L"+ path.split("L")[1];
                    let newpath = "M"+ startX+ " "+ startY + " "+ end;
                    let color = getColor(element);
                    if (endNodeSVG.attr("class") === "locked"){
                        currentEdge.transition().duration(1000).attr("d", newpath).style("stroke","red");
                        wrong_arcs.push([currentEdge,element]);
                    }
                    else {
                        currentEdge.transition().duration(1000).attr("d", newpath).style("stroke",color);
                    }

                }
                else if(element.arrow === index && element.tail !== 0 && element.tail !== 1 && element.tail !== coordinates.length-1){
                    let currentEdge = d3.select("#edge"+element.tail+"-"+element.arrow);
                    let path = currentEdge.attr("d");
                    let start = path.split("L")[0];
                    let newpath = start + " L" +endX+ " "+endY;
                    let color = getColor(element);
                    if (endNodeSVG.attr("class") === "locked"){
                        currentEdge.transition().duration(1000).attr("d", newpath).style("stroke","red");
                        wrong_arcs.push([currentEdge,element]);
                    }
                    else {
                        currentEdge.transition().duration(1000).attr("d", newpath).style("stroke",color);
                    }
                }


            });

            currentNode.transition().duration(1000).attr("cx", oldX).attr("cy", oldY).on("end",function () {
                currentNode.attr("class","unlocked");
                wrong_arcs.forEach(function (element) {

                    let startNodeSVG = d3.select("#node" + element[1].tail);
                    let endNodeSVG = d3.select("#node" + element[1].arrow);
                    if (startNodeSVG.attr("class") === "unlocked" &&  endNodeSVG.attr("class") === "unlocked"){
                        let color = getColor(element[1]);
                        element[0].style("stroke", color);

                    }
                });
            });
        },(coordinates.length-3)*1000 + (index+1)*1000);

    }
}

function drawEdges(edges_group,arcs, coordinates, animation) {

    if (animation === "Compression + Expansion"){
        arcs.forEach(function (element, index) {
            let startNode = coordinates[element.tail];
            let endNode = coordinates[element.arrow];

            let startX = startNode[0];
            let startY = -startNode[1];

            let endX = endNode[0];
            let endY = -endNode[1];

            edges_group.append("path")
                .attr("d", "M" + startX + " " + startY + " L" + endX + " " + endY)
                .style("stroke", "black")
                .attr("id","edge"+element.tail+"-"+element.arrow)
                .style("stroke-width", "3px");

        });
    }

    else if (animation === "None") {

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

