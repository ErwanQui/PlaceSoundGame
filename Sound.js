const audioContext = new AudioContext();
const listener = audioContext.listener;

var sourcePlaces = [];
var audios = [];
var sources = [];
var gains = [];

var audioElem;

function AudioBegin() {
	audioContext.resume();

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

	listener.setPosition(0, 0, 0);
}

function AudioChoose(inc, path) {
	audioElem = document.getElementById("PlayPause" + inc);
	PlayPause("PlayPause" + inc, inc, "Pause");
	if (path[0]) {
		// document.getElementById("chooseSound" + inc).src = "Audio/" + path[0].name;
		document.getElementById("chooseSound" + inc).src = "https://github.com/bkfg12335/PlaceSoundGame/tree/main/Audio/" + path[0].name;
		audioElem.style.visibility = "visible";
		audioElem.style.position = "relative";
		document.getElementById("src" + inc).style.visibility = "visible";
	}
	else {
		audioElem.style.visibility = "hidden";
		audioElem.style.position = "absolute";
		document.getElementById("src" + inc).style.visibility = "hidden";
	}
}

function AudioUpdatePos(inc, pos){
	sourcePlaces[inc-1].setPosition(pos[inc-1][0], pos[inc-1][1], pos[inc-1][2]);
}

function AudioUpdateOr(or){
	listener.setOrientation(Math.cos((or-90)*Math.PI/180), 0, Math.sin((or-90)*Math.PI/180), 0, 1, 0);
}

function PlayPause(id, inc, playing) {
	if (playing == "Pause"){
		document.getElementById("chooseSound" + inc).pause()
		document.getElementById(id).value = "Play";
	}
	else {
		document.getElementById("chooseSound" + inc).play();
		document.getElementById(id).value = "Pause";
	}
}