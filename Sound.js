const audioContext = new AudioContext();
const Gain = audioContext.createGain();
const listener = audioContext.listener;

var sourcePlaces = [];
var audios = [];
var sources = [];



// const audio = document.getElementById("TestSound");
// const source = audioContext.createMediaElementSource(audio);


function AudioBegin() {
	audioContext.resume();
	SetId();

	for (var i = 1; i <= nbSound; i ++) {
		sourcePlaces.push(audioContext.createPanner());
		sourcePlaces[i-1].connect(audioContext.destination);
		Gain.connect(sourcePlaces[i-1]);
		audios.push(document.getElementById("chooseSound" + i));
		document.getElementById("chooseSound" + i);
		sources.push(audioContext.createMediaElementSource(document.getElementById("chooseSound" + i)));
		sources[i-1].connect(Gain);
	}

	listener.setPosition(0, 0, 0);
	Gain.gain.setValueAtTime(0.3, 0);
}

function AudioChoose(inc, path) {
	console.log(inc, path);
	document.getElementById("chooseSound" + inc).src = "Audio/" + path;
	console.log(document.getElementById("chooseSound" + inc));
	console.log(document.getElementById("file1").files[0].name);
}

function AudioUpdate(pos, or){
	listener.setOrientation(Math.cos((or[1]-90)*Math.PI/180), 0, Math.sin((or[1]-90)*Math.PI/180), 0, 1, 0);
	console.log(listener)
	sourcePlace.setPosition(pos[0], pos[1], pos[2]);
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