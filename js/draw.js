Array.prototype.removeEl = function(el) {
    this.splice(this.indexOf(el), 1);
};

var fontsize = 30;
var offset = 50;
multiplier = 80;


function Node(data, parent) {
    this.data = data;
    this.parent = parent;
    this.children = [];
}

function Tree(root) {
    this.root = root;
}

function createTrees(arcs) {
    var trees = [];
    arcs.forEach(function (element) {
        if (element.tree === -1){
            trees.push(new Tree(new Node(element.tail, null)));
        }
    });

    return trees;
}

function populateTree(node,arcs, color) {
    if (arcs.length === 0)
        return;

    var archi = arcs.slice();
    arcs.forEach(function (element) {
        if (node.data === element.arrow && element.tree === color){
            node.children.push(new Node(element.tail, node));
            archi.removeEl(element);
        }

    });

    node.children.forEach(function (element) {
        populateTree(element,archi, color);
    });
}

function calculateVr(nodes){

}

function coordinates(nodes, arcs){
    trees = createTrees(arcs);

    populateTree(trees[0].root,arcs, trees[0].root.data);
    populateTree(trees[1].root,arcs, trees[1].root.data);
    populateTree(trees[2].root,arcs, trees[2].root.data);

    var t1 = trees[0];
    var t2 = trees[1];
    var t3 = trees[2];


    nodes.forEach(function (element,index) {
        calculateVr(t1,nodes);
    });



    //console.log(countDescendants(findNodeInTree(t1,0), 0));
    console.log(countAncestor(findNodeInTree(t1,8)))
}

function findNodeInTree(tree, node) {
    return findNode(tree.root, node);
}

function findNode(currentNode, node) {
    var nodo = null;
    if (currentNode.data === node){
        return currentNode;
    }

    for (let i = 0; i < currentNode.children.length; i++) {
        var nodoTrovato = findNode(currentNode.children[i], node);
        if (nodoTrovato != null) {
            return  nodoTrovato;
        }
    }
}

function countDescendants(node) {
    if (node.children.length === 0){
        return 1;
    }
    var cont = 0;
    node.children.forEach(function (element) {
        cont += countDescendants(element);
    });
    return cont+1;
}

function countAncestor(node) {
    cont = 1;
    while (node.parent != null){
        cont++;
        node = node.parent;
    }
    return cont;
}

// function draw(arcs){
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
