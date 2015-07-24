// home page
if(document.getElementsByTagName('title')[0].innerHTML == 'Armen Ourfalian') {
	document.getElementsByTagName('header')[0].innerHTML+= "<div class='container' id='navBar'>"
		+ 	"<ul>"
		+ 		"<li><a href='index.html'>Home</a></li>"
		+ 		"<li><a href='simple_harmonic/index.html'>Simple Harmonic Oscillator</a></li>"
		+ 		"<li><a href='random_student/index.html'>Random Student</a></li>"
		+ 		"<li><a href='pills_riddle/index.html'>Pills Riddle</a></li>"
		+ 		"<li><a href='rgb/index.html'>RGB Colors</a></li>"
		+ 		"<li><a href='physics_engine/index.html'>Physics Engine</a></li>"
		+ 	"</ul>"
		+ "</div>";

}

// Every other page
else {
	document.getElementsByTagName('header')[0].innerHTML+= "<div class='container' id='navBar'>"
		+ 	"<ul>"
		+ 		"<li><a href='../index.html'>Home</a></li>"
		+ 		"<li><a href='../simple_harmonic/index.html'>Simple Harmonic Oscillator</a></li>"
		+ 		"<li><a href='../random_student/index.html'>Random Student</a></li>"
		+ 		"<li><a href='../pills_riddle/index.html'>Pills Riddle</a></li>"
		+ 		"<li><a href='../rgb/index.html'>RGB Colors</a></li>"
		+ 		"<li><a href='../physics_engine/index.html'>Physics Engine</a></li>"
		+ 	"</ul>"
		+ "</div>";
}