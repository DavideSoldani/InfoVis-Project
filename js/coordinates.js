Array.prototype.removeEl = function(el) {
    this.splice(this.indexOf(el), 1);
};
let multiplier = 0;
let nodeNumber = 0;

function Node(data, parent) {
    this.data = data;
    this.parent = parent;
    this.children = [];
}

function Tree(root) {
    this.root = root;
}

function createTrees(arcs) {
    let trees = [];
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

    let archi = arcs.slice();
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
    let nodeInR = findNodeInTree(tr,label);
    let numdescR = countDescendants(nodeInR);
    //console.log("numdescR   " + numdescR);

    let nodeInG = findNodeInTree(tg, label);
    let numancG = countAncestor(nodeInG);

    //console.log("numAncG       "+ numancG);
    //////////
    let sumDescBv = 0;
    let nodeInB = findNodeInTree(tb,label);
    let node = nodeInB;
    while (node.parent != null){
        let currentNode = findNodeInTree(tr, node.data);
        sumDescBv += countDescendants(currentNode);
        node = node.parent;
    }

    //console.log("sumDescB     "+sumDescBv);

    let sumDescGv = 0;
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
    let nodeInB = findNodeInTree(tb,label);
    let numdescB = countDescendants(nodeInB);
    let nodeInR = findNodeInTree(tr, label);

    let numancR = countAncestor(nodeInR);

    //////////
    let sumDescRv = 0;
    let node = nodeInR;
    while (node.parent != null){
        let currentNode = findNodeInTree(tb, node.data);
        sumDescRv += countDescendants(currentNode);
        node = node.parent;
    }


    let sumDescGv = 0;
    let nodeInG = findNodeInTree(tg, label);
    node = nodeInG;
    while (node.parent != null){
        currentNode = findNodeInTree(tb, node.data);
        sumDescGv += countDescendants(currentNode);
        node = node.parent;
    }


    return 2+ sumDescGv + sumDescRv - numdescB - numancR;
}

function calculateGv(tb, tg, tr, label) {
    let nodeInG = findNodeInTree(tg,label);
    let numdescG = countDescendants(nodeInG);
    let nodeInB = findNodeInTree(tb, label);
    let numancB = countAncestor(nodeInB);

    //////////
    let sumDescRv = 0;
    let nodeInR = findNodeInTree(tr, label);
    let node = nodeInR;
    while (node.parent != null){
        let currentNode = findNodeInTree(tg, node.data);
        sumDescRv += countDescendants(currentNode);
        node = node.parent;
    }

    let sumDescBv = 0;
    node = nodeInB;
    while (node.parent != null){
        currentNode = findNodeInTree(tg, node.data);
        sumDescBv += countDescendants(currentNode);
        node = node.parent;
    }

    return 2+sumDescBv + sumDescRv - numdescG - numancB;
}

function find_coordinates(nodes, arcs, animation){
    nodeNumber =  nodes.length;
    trees = createTrees(arcs);
    multiplier = 1000/nodeNumber;
    populateTree(trees[0].root,arcs, trees[0].root.data);
    populateTree(trees[1].root,arcs, trees[1].root.data);
    populateTree(trees[2].root,arcs, trees[2].root.data);

    let tb = trees[0];
    let tg = trees[1];
    let tr = trees[2];

    let coordinates = [];

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


    draw(coordinates, arcs, animation);

}

function findNodeInTree(tree, node) {
    return findNode(tree.root, node);
}

function findNode(currentNode, node) {
    let nodo = null;
    if (currentNode.data === node){
        return currentNode;
    }

    for (let i = 0; i < currentNode.children.length; i++) {
        let nodoTrovato = findNode(currentNode.children[i], node);
        if (nodoTrovato != null) {
            return  nodoTrovato;
        }
    }
}

function countDescendants(node) {
    if (node.children.length === 0){
        return 1;
    }
    let cont = 0;
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

