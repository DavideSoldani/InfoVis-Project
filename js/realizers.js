/*------------------------------------------------------------------------------------------------------------------
Definisco l'oggetto Arco
--------------------------------------------------------------------------------------------------------------------*/
function Arc(tail, arrow, tree) {
	this.tail = tail; //nodo da cui parte l'arco
	this.arrow = arrow; //nodo in cui arriva l'arco
	this.tree = tree; //albero di appartenenza dell'arco (t1,t2,t3)
}



Arc.prototype.printArc = function () {
	console.log("The arc start from "+this.tail.toString()+" and goes to "+this.arrow.toString()+"it belongs to the  "+this.tree.toString()+" tree");
};


function creaSchnyderRealizers(embedding){
	var embeddingCopy = embedding.map(elemnt => elemnt.slice());
	var nodiEliminati = [];
	//inizializzo gli alberi
	var t1 = 0; //radice di t1
	var t2 = 1; //radice di t2
	var t3 = embedding.length-1; //radice di t3

	//elimino i nodi e gli archi in modo da contrarre il grafo
	for(let i=0; i<embeddingCopy.length-3; i++){
		var nodiDaIgnorare = [t1,t2,t3].concat(nodiEliminati);
		var viciniDiT3 = embeddingCopy[t3];
		//scorro i nodi che hanno un arco in comune a t3
		let nodoDaEliminare = null;
		for(let j=0; j<viciniDiT3.length; j++){
			let nodoAttuale = viciniDiT3[j];
			if(!nodiDaIgnorare.includes(nodoAttuale)){
				let viciniNodoAttuale = embeddingCopy[nodoAttuale];
				let viciniInComune =  viciniDiT3.filter(x => viciniNodoAttuale.includes(x));
				if(viciniInComune.length === 2) {
					nodoDaEliminare = nodoAttuale;
				}

			}
		}

		viciniNodoDaEliminare = embeddingCopy[nodoDaEliminare];
		//cancello il nodo dalla lista di adiacenza dei vicini
		for(let j=0; j<viciniNodoDaEliminare.length;j++){
			let vicino = viciniNodoDaEliminare[j];
			let listaDiAdiacenzaVicino = embeddingCopy[vicino];
			let indiceNodoDaEliminareNellaListaDiAdiacenzaDelVicino = listaDiAdiacenzaVicino.indexOf(nodoDaEliminare);

			if(vicino === t3 || listaDiAdiacenzaVicino.includes(t3)){
				listaDiAdiacenzaVicino.splice(indiceNodoDaEliminareNellaListaDiAdiacenzaDelVicino,1);
			}
			else{
				listaDiAdiacenzaVicino[indiceNodoDaEliminareNellaListaDiAdiacenzaDelVicino] = t3;
				embeddingCopy[t3].push(vicino);
			}
		}

		nodiEliminati.push(nodoDaEliminare);
	}

	//fase di decompressione---->

	var arcs = [];

	while(nodiEliminati.length>0){
		let nodoAttuale = nodiEliminati.pop();

		let viciniNodoAttuale = embeddingCopy[nodoAttuale];

		let t3end = viciniNodoAttuale.indexOf(t3);

		let t1end = t3end === 0 ?
			viciniNodoAttuale.length - 1 : t3end - 1;

		let t2end = t3end === viciniNodoAttuale.length - 1 ?
			0 : t3end + 1

		let temp = new Arc(nodoAttuale,t3,t3);
		arcs.push(temp);
		temp = new Arc(nodoAttuale, viciniNodoAttuale[t1end],t1);
		arcs.push(temp);
		temp = new Arc(nodoAttuale, viciniNodoAttuale[t2end],t2);
		arcs.push(temp);

		if(viciniNodoAttuale[0] === t3){
			viciniNodoAttuale.splice(viciniNodoAttuale.length -1,1);
			viciniNodoAttuale.splice(0,2);
		}
		else if(viciniNodoAttuale[0] === t2){
			viciniNodoAttuale.splice(viciniNodoAttuale.length -2,2);
			viciniNodoAttuale.splice(0,1);
		}
		else{
			viciniNodoAttuale.splice(t1end,3);
		}

		for(let i = 0; i<viciniNodoAttuale.length; i++){
			let vicino = viciniNodoAttuale[i];
			let t3IndiceArco = arcs.findIndex(function(elem){
				if(elem.tail!==vicino)
					return false;
				else if(elem.arrow!==t3)
					return false;
				else if(elem.tree!==t3)
					return false;
				else return true;

			});
			arcs.splice(t3IndiceArco,1);
		}
		for(let i=0; i<viciniNodoAttuale.length;i++){
			let temp = new Arc(viciniNodoAttuale[i],nodoAttuale,t3);
			arcs.push(temp);
		}
	}
	let temp = new Arc(t1,t2,-1);
	arcs.push(temp);
	temp = new Arc(t2, t3,-1);
	arcs.push(temp);
	temp = new Arc(t3, t1,-1);
	arcs.push(temp);
	console.log(arcs.length);
	return arcs;
}

//var example = [[10,5,3,2,1],[0,2,4,7,10],[0,3,6,4,1],[0,5,9,6,2],[2,6,7,1],[0,10,9,3],[3,9,8,7,4,2],[6,8,10,1,4],[9,10,7,6],[5,10,8,6,3],[0,1,7,8,9,5]];
//var example = [[3,2,1],[0,2,3],[0,3,1],[0,1,2]];
var example = [[8,7,5,3,2,1],[0,2,4,8],[0,3,4,1],[5,6,4,2,0],[7,8,1,2,3,6],[3,0,7,6],[3,5,7,4],[0,8,4,6,5],[0,1,4,7]];

var result_arcs = creaSchnyderRealizers(example);

// for(let i=0; i<result_arcs.length;i++){
// 	let arc = result_arcs[i];
// 	console.log(
// 		arc.tail+"---->"+arc.arrow + (arc.tree === t1 ? ", blue" :
// 		arc.tree === t2 ? ", green" :
// 			arc.tree === t3 ? ", red" : ", ext")
//
// 	);
// }
//console.log(result_arcs);
find_coordinates(example, result_arcs);

