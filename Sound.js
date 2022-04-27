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
	if (path[0] && path[0] != "No Sound") {
		if (path[0].name) {
			document.getElementById("chooseSound" + inc).src = "Audio/" + path[0].name;
		}
		else {
			document.getElementById("chooseSound" + inc).src = "Audio/" + path[0];
		}
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
	a = Math.cos((or-90)*Math.PI/180);
	b = Math.sin((or-90)*Math.PI/180);
	listener.setOrientation(Math.cos((or-90)*Math.PI/180), 0, Math.sin((or-90)*Math.PI/180), 0, 1, 0);
	c = listener.forwardX.value;
	d = listener.forwardY.value;
	e = listener.forwardZ.value;
	if (a<0.1 && a>-0.1) {a = 0;}
	if (b<0.1 && b>-0.1) {b = 0;}
	if (c<0.1 && c>-0.1) {c = 0;}
	if (d<0.1 && d>-0.1) {d = 0;}
	if (e<0.1 && e>-0.1) {e = 0;}
	document.getElementById("Representation").value = "("+a+", "+0+", "+b+")";
	document.getElementById("Representation2").value = "("+c+", "+d+", "+e+")";
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