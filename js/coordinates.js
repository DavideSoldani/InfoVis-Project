Array.prototype.removeEl = function(el) {
    this.splice(this.indexOf(el), 1);
};
var multiplier = 50;
var nodeNumber = 0;

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

function calculateRv(tb, tg, tr, label){
    var nodeInR = findNodeInTree(tr,label);
    var numdescR = countDescendants(nodeInR);
    //console.log("numdescR   " + numdescR);

    var nodeInG = findNodeInTree(tg, label);
    var numancG = countAncestor(nodeInG);

    //console.log("numAncG       "+ numancG);
    //////////
    var sumDescBv = 0;
    var nodeInB = findNodeInTree(tb,label);
    var node = nodeInB;
    while (node.parent != null){
        var currentNode = findNodeInTree(tr, node.data);
        sumDescBv += countDescendants(currentNode);
        node = node.parent;
    }

    //console.log("sumDescB     "+sumDescBv);

    var sumDescGv = 0;
    node = nodeInG;
    while (node.parent != null){
        currentNode = findNodeInTree(tr, node.data);
        sumDescGv += countDescendants(currentNode);
        node = node.parent;
    }

    //console.log("sumDescG    "+sumDescGv);

    return 2+sumDescGv + sumDescBv - numdescR - numancG;
}



function calculateBv(tb, tg, tr, label) {
    var nodeInB = findNodeInTree(tb,label);
    var numdescB = countDescendants(nodeInB);
    var nodeInR = findNodeInTree(tr, label);

    var numancR = countAncestor(nodeInR);

    //////////
    var sumDescRv = 0;
    var node = nodeInR;
    while (node.parent != null){
        var currentNode = findNodeInTree(tb, node.data);
        sumDescRv += countDescendants(currentNode);
        node = node.parent;
    }


    var sumDescGv = 0;
    var nodeInG = findNodeInTree(tg, label);
    node = nodeInG;
    while (node.parent != null){
        currentNode = findNodeInTree(tb, node.data);
        sumDescGv += countDescendants(currentNode);
        node = node.parent;
    }


    return 2+ sumDescGv + sumDescRv - numdescB - numancR;
}

function calculateGv(tb, tg, tr, label) {
    var nodeInG = findNodeInTree(tg,label);
    var numdescG = countDescendants(nodeInG);
    var nodeInB = findNodeInTree(tb, label);
    var numancB = countAncestor(nodeInB);

    //////////
    var sumDescRv = 0;
    var nodeInR = findNodeInTree(tr, label);
    var node = nodeInR;
    while (node.parent != null){
        var currentNode = findNodeInTree(tg, node.data);
        sumDescRv += countDescendants(currentNode);
        node = node.parent;
    }

    var sumDescBv = 0;
    node = nodeInB;
    while (node.parent != null){
        currentNode = findNodeInTree(tg, node.data);
        sumDescBv += countDescendants(currentNode);
        node = node.parent;
    }

    return 2+sumDescBv + sumDescRv - numdescG - numancB;
}

function find_coordinates(nodes, arcs){
    nodeNumber =  nodes.length;
    trees = createTrees(arcs);

    populateTree(trees[0].root,arcs, trees[0].root.data);
    populateTree(trees[1].root,arcs, trees[1].root.data);
    populateTree(trees[2].root,arcs, trees[2].root.data);

    var tb = trees[0];
    var tg = trees[1];
    var tr = trees[2];

    var coordinates = [];

    nodes.forEach(function (element,index) {
        if (index > 1 && index < nodes.length - 1) {
            coordinates[index] = [];
            coordinates[index].push(calculateBv(tb, tg, tr, index)*multiplier);
            coordinates[index].push(calculateGv(tb, tg, tr, index)* multiplier);
            coordinates[index].push(calculateRv(tb, tg, tr, index)* multiplier);
        }
    });

    coordinates[0] = [(nodeNumber-2)*multiplier, multiplier,0];
    coordinates[1] = [0,(nodeNumber-2)*multiplier,multiplier];
    coordinates[nodeNumber-1] = [multiplier,0,(nodeNumber-2)*multiplier];


    console.log(coordinates);


    draw(coordinates, arcs);

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

