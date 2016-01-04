// home page
if(document.getElementsByTagName('title')[0].innerHTML == 'Armen Ourfalian') {
	document.getElementsByTagName('nav')[0].innerHTML+= "<ul>"
		+ 		"<li><a href='index.html'>Home</a></li>"
		+ 		"<li><a href='simple_harmonic/index.html'>Simple Harmonic Oscillator</a></li>"
		+ 		"<li><a href='random_student/index.html'>Random Student</a></li>"
		+ 		"<li><a href='pills_riddle/index.html'>Pills Riddle</a></li>"
		+ 		"<li><a href='wordsearch/index.html'>Word Search</a></li>"
		+ 		"<li><a href='rgb/index.html'>RGB Colors</a></li>"
		+ 		"<li><a href='physics_engine/index.html'>Physics Engine</a></li>"
		+ 	"</ul>";
}

// Every other page
else {
	document.getElementsByTagName('nav')[0].innerHTML+= "<ul>"
		+ 		"<li><a href='../index.html'>Home</a></li>"
		+ 		"<li><a href='../simple_harmonic/index.html'>Simple Harmonic Oscillator</a></li>"
		+ 		"<li><a href='../random_student/index.html'>Random Student</a></li>"
		+ 		"<li><a href='../pills_riddle/index.html'>Pills Riddle</a></li>"
		+ 		"<li><a href='../wordsearch/index.html'>Word Search</a></li>"
		+ 		"<li><a href='../rgb/index.html'>RGB Colors</a></li>"
		+ 		"<li><a href='../physics_engine/index.html'>Physics Engine</a></li>"
		+ 	"</ul>"
}

// Make the About this Page section expandable
document.getElementById('about').addEventListener('click', function() {
	// In case there are multiple <p> elements in it,
	// Hide all the <p>'s inside the about section
	var aboutContents = document.getElementById('aboutContents');
	toggleClass(aboutContents,'hide');
	
	// Change the plus/minus sign accordingly
	if(hasClass(aboutContents,'hide')) {
		document.getElementById('expand').innerHTML='[ &plus; ]';
	}
	else {
		document.getElementById('expand').innerHTML='[ &minus; ]';	
	}
})