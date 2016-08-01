
// vertically center all the project-descriptions (actually the targets are the h2 element inside them)
var projectDescriptions = document.getElementsByClassName("project-description");
for (var i = 0; i < projectDescriptions.length; i++) {
	verticalCenter(projectDescriptions[i].childNodes[1]);
}
