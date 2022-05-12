const audioContext = new AudioContext();
const listener = audioContext.listener;

var sourcePlaces = [];
var audios = [];
var sources = [];
var gains = [];

var audioElem;
var test = 0;

//focntion permettant de lancer l'audio

function AudioBegin() {

	//lancement de l'audio

	audioContext.resume();

	//set up et mise en place de tous les noeuds : Audio --> Gain --> PositionAudio --> ContextAudio

	for (var i = 1; i <= nbSound; i ++) {
		sourcePlaces.push(audioContext.createPanner());
		gains.push(audioContext.createGain());
		audios.push(document.getElementById("chooseSound" + i));
		sources.push(audioContext.createMediaElementSource(document.getElementById("chooseSound" + i)));

		sourcePlaces[i-1].connect(audioContext.destination);
		gains[i-1].connect(sourcePlaces[i-1]);		
		sources[i-1].connect(gains[i-1]);

		gains[i-1].gain.setValueAtTime(0.3, 0);
	}

	//placement du listener

	listener.setPosition(0, 0, 0);
}

//fonction allant récupérer la bande son sélectionnée

function AudioChoose(inc, path) {
	audioElem = document.getElementById("PlayPause" + inc);

	//mets en pause le son concerné à chaque changement

	PlayPause("PlayPause" + inc, inc, "Pause");

	//vérifie qu'un chemin a bien été entré

	if (path[0] && path[0] != "No Sound") {

		//affecte le chemin du fichier audio selon le mode en cours d'utilisation

		if (path[0].name) {
			document.getElementById("chooseSound" + inc).src = "Audio/" + path[0].name;
		}
		else {
			document.getElementById("chooseSound" + inc).src = "Audio/" + path[0];
		}

		//affiche le bouton play/pause et la source concernés

		audioElem.style.visibility = "visible";
		audioElem.style.position = "relative";
		document.getElementById("src" + inc).style.visibility = "visible";
	}
	else {

		//réinitialise le chemin du fichier audio lorsque l'uilisateur n'a rien choisi

		document.getElementById("chooseSound" + inc).src = "";

		//cache le bouton play/pause et la source concernés

		audioElem.style.visibility = "hidden";
		audioElem.style.position = "absolute";
		document.getElementById("src" + inc).style.visibility = "hidden";
	}
}

//fonction permettant d'update la position des sources sonores

function AudioUpdatePos(inc, pos){
	sourcePlaces[inc-1].setPosition(pos[inc-1][0], pos[inc-1][1], pos[inc-1][2]);
}

//fonction permettant d'update l'orientation de l'utilisateur

function AudioUpdateOr(or){
	listener.setOrientation(Math.cos((or-90)*Math.PI/180), 0, Math.sin((or-90)*Math.PI/180), 0, 1, 0);
}

//fonction permettant d'update le volume de chacune des sources

function UpdateGain(inc, value){
	gains[inc-1].gain.setValueAtTime(value, 0);
}

//fonction permettant de jouer et mettre en pause les différentes bandes sons

function PlayPause(id, inc, playing) {
	if (playing == "Pause"){

		//si le bouton avait la valeur pause, il met l'audio concerné en pause et change la valeur du bouton en play

		document.getElementById("chooseSound" + inc).pause()
		document.getElementById(id).value = "Play";
	}
	else {

		//si le bouton avait la valeur play, il met l'audio concerné en play et change la valeur du bouton en pause

		document.getElementById("chooseSound" + inc).play();
		document.getElementById(id).value = "Pause";
	}
}