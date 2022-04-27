var nbSound = 4;
var temp;
var tempX;
var tempY;

var positions = [];
var orientation = 0;


var	file;
var	provided;

function Display() {
	SetId();


	file = document.getElementsByClassName("FileChoose");
	provided = document.getElementsByClassName("AudioChoose");

	document.getElementsByClassName("Using")[0].style.visibility = "visible";
	document.getElementsByClassName("BeginButton")[0].style.visibility = "hidden";
	document.getElementsByClassName("BeginButton")[0].style.position = "absolute";

	for (var i = 1; i <= nbSound; i++) {
		document.getElementById("PlayPause" + i).style.visibility = "hidden";
		document.getElementById("PlayPause" + i).style.position = "absolute";
		positions.push([0, 0, 0]);
		provided[i-1].style.visibility = "hidden";
		provided[i-1].style.position = "absolute";
	}

	AudioBegin();
}

function NbAudios(Nb) {
	for (var i = 1; i < nbSound; i++) {
		if (i < Nb) {
			document.getElementsByClassName("Flex")[i].style.visibility = "visible";
			document.getElementsByClassName("Flex")[i].style.position = "relative";
		}
		else {
			document.getElementsByClassName("Flex")[i].style.visibility = "hidden";
			document.getElementsByClassName("Flex")[i].style.position = "absolute";
			temp = i+1;
			PlayPause("PlayPause" + temp, "Pause");
		}
	}
}

function ModeChange(mode) {
	if (mode=="with") {
		for (var i = 0; i < nbSound; i++) {
			file[i].style.visibility = "visible";
			file[i].style.position = "relative";
			provided[i].style.visibility = "hidden";
			provided[i].style.position = "absolute";
			temp = i+1;
			AudioChoose(temp, document.getElementById("file"+temp).files);
		}
	}
	else {
		for (var i = 0; i < nbSound; i++) {
			file[i].style.visibility = "hidden";
			file[i].style.position = "absolute";
			provided[i].style.visibility = "visible";
			provided[i].style.position = "relative";
			temp = i+1;
			console.log(document.getElementById("audioChoose"+temp).value);
			AudioChoose(temp, [document.getElementById("audioChoose"+temp).value]);
		}
	}
}

function UpdatePos(inc, dir, value) {
	positions[inc-1][dir] = value;
	tempX = positions[inc-1][0]*20 - 6;
	tempY = -positions[inc-1][2]*20 + 98;
	document.getElementById("src" + inc).style.transform = "translate("+tempX+"px,"+tempY+"px)";
	document.getElementById("src" + inc).style.zIndex = positions[inc-1][1];
	AudioUpdatePos(inc, positions);
}

function UpdateOr(value) {
	orientation = value;
	document.getElementsByClassName("UserPos")[0].style.transform = "translate(-9px, 95px) RotateZ(-"+value+"deg)";
	AudioUpdateOr(orientation);
}


function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
	      /* Make an HTTP request using the attribute value as the file name: */
	      xhttp = new XMLHttpRequest();
	      xhttp.onreadystatechange = function() {
	        if (this.readyState == 4) {
	          if (this.status == 200) {
	          	for (var j = 0; j < nbSound; j++) {
	          		elmnt.innerHTML += this.responseText;	          	
	          	}
	          }
	          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
	    	  elmnt.removeAttribute("w3-include-html");
	          includeHTML();
	        }
	      }
	      xhttp.open("GET", file, true);
	      xhttp.send();
	      /* Exit the function: */
	      return;
    }
  }
}

function SetId() {
	var bloc = document.getElementsByClassName("Flex");
  	for (i = 1; i <= bloc.length; i++) {
	  	var elem = bloc[i-1].getElementsByTagName("*");
	  	for (j = 0; j < elem.length; j++) {
	  		if(elem[j].getAttribute("id")) {
	  			elem[j].id = elem[j].id + i;
	  			elem[j].increment = i;
	  		}
	  	}
	}
}