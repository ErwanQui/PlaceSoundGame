var nbSound = 4;
var nbAudio = 4;
var temp;
var tempX;
var tempY;

var positions = [];
var gameMode = "with";

var	file;
var	provided;


//Fonction s'activant une unique fois après l'appui sur le bouton begin. Elle affiche l'ensemble du site

function Display() {

	//Instanciation des ids pour les blocs créés à partir de choose.html

	SetId();

	file = document.getElementsByClassName("FileChoose");
	provided = document.getElementsByClassName("AudioChoose");

	//Cache le bouton begin et affiche tout le reste

	document.getElementsByClassName("Using")[0].style.visibility = "visible";
	document.getElementsByClassName("BeginButton")[0].style.visibility = "hidden";
	document.getElementsByClassName("BeginButton")[0].style.position = "absolute";

	//Mets les boutons play/pauses en invisible et cachent les blocs liés au mode provide

	for (var i = 1; i <= nbSound; i++) {
		document.getElementById("PlayPause" + i).style.visibility = "hidden";
		document.getElementById("PlayPause" + i).style.position = "absolute";
		positions.push([0, 0, 0]);
		provided[i-1].style.visibility = "hidden";
		provided[i-1].style.position = "absolute";
	}

	//Active l'instanciation de l'audio

	AudioBegin();
}

//fonction s'activant lorsque le nombre d'audios est changé. Elle affiche le nombre de blocs indiqué et cache le reste

function NbAudios(Nb) {
	nbAudio = Nb
	for (var i = 1; i < nbSound; i++) {
		if (i < Nb) {

			//affiche les blocs tant qu'on n'en a pas suffisamment

			document.getElementsByClassName("Flex")[i].style.visibility = "visible";
			document.getElementsByClassName("Flex")[i].style.position = "relative";
		}
		else {

			//cache les blocs en trop

			document.getElementsByClassName("Flex")[i].style.visibility = "hidden";
			document.getElementsByClassName("Flex")[i].style.position = "absolute";
			temp = i+1;

			//Réinitialise les valeurs des blocs du mode provide (on peut pas le faire pour les "file choose")

			document.getElementById("audioChoose"+temp).value = "No Sound";
			AudioChoose(temp, ["No Sound"]);
		}
	}
}

//fonction s'activant lorsqu'on change de mode avec les radios button. Elle alterne l'affichage entre les modes sélection et provide

function ModeChange(mode) {
	gameMode = mode;
	if (mode=="with") {
		for (var i = 0; i < nbSound; i++) {

			//cache les blocs provide et affiche les blocs sélections

			file[i].style.visibility = "";
			file[i].style.position = "relative";
			provided[i].style.visibility = "hidden";
			provided[i].style.position = "absolute";

			//Mets en place la disposition en fonction des audios déjà choisis

			temp = i+1;
			AudioChoose(temp, document.getElementById("file"+temp).files);

			//Appelle de la fonction NbAudios pour effacer les blocs superflus

			NbAudios(nbAudio);
		}
	}
	else {
		for (var i = 0; i < nbSound; i++) {

			//cache les blocs sélections et affiche les blocs provide


			file[i].style.visibility = "hidden";
			file[i].style.position = "absolute";
			provided[i].style.visibility = "";
			provided[i].style.position = "relative";

			//Mets en place la disposition en fonction des audios déjà choisis

			temp = i+1;
			AudioChoose(temp, [document.getElementById("audioChoose"+temp).value]);

			//Appelle de la fonction NbAudios pour effacer les blocs superflus

			NbAudios(nbAudio);
		}
	}
}

//fonction permettant d'update la position

function UpdatePos(inc, dir, value) {

	//On affiche le cercle représentant la source sonore à sa nouvelle position

	positions[inc-1][dir] = value;
	tempX = positions[inc-1][0]*20 - 6;
	tempY = -positions[inc-1][2]*20 + 98;
	document.getElementById("src" + inc).style.transform = "translate("+tempX+"px,"+tempY+"px)";
	document.getElementById("src" + inc).style.zIndex = positions[inc-1][1];

	//On update l'audio

	AudioUpdatePos(inc, positions);
}

//fonction permettant d'update l'orientation

function UpdateOr(value) {

	//On affiche dans le bon sens le triangle représentatif de l'utilisateur

	document.getElementsByClassName("UserPos")[0].style.transform = "translate(-9px, 95px) RotateZ(-"+value+"deg)";

	//On update l'audio

	AudioUpdateOr(value);
}

//fonction permettant d'inclure un fichier html dans un autre

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

	          	//on y passe nbSound fois pour avoir le nombre de blocs correspondants dans le code html

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

//fonction permettant de set des ids différentes aux blocs générés par la fonction includeHTML()

function SetId() {

	//On récupère les différents blocs ajoutés

	var bloc = document.getElementsByClassName("Flex");

	//On itère sur chacun d'eux et on rajoute l'itérateur à tous les ids des éléments de chaque bloc

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