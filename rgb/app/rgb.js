var redSingleSlider = document.getElementById('redSingleSlider');
var greenSingleSlider = document.getElementById('greenSingleSlider');
var blueSingleSlider = document.getElementById('blueSingleSlider');
var singleColorOutput = document.getElementById('singleColorOutput');
var redSingleSliderValue = document.getElementById('redSingleSliderValue');
var greenSingleSliderValue = document.getElementById('greenSingleSliderValue');
var blueSingleSliderValue = document.getElementById('blueSingleSliderValue');
var rgbValue = document.getElementById('rgbValue');
var hexValue = document.getElementById('hexValue');
var saveColorButton = document.getElementById('saveColorButton');
var randomColorButton = document.getElementById('randomColorButton');
var savedColorsCont = document.getElementById('savedColorsCont');
var r = 215;
var g = 215;
var b = 30;
var h = '';
var nh = '';
var rgb = '';
// Returns an integer value of a given string
// Because I've heard parseInt messes up the variable
var intigize = function(string) {
	var x = string;
	return parseInt(x,10);
}

// Turns a decimal number 0-15 into a string of its hexadecimal value 
var hexadecimize = function(dec){
	if(dec>9){
		if(dec==10){return 'A'}
		if(dec==11){return 'B'}
		if(dec==12){return 'C'}
		if(dec==13){return 'D'}
		if(dec==14){return 'E'}
		if(dec==15){return 'F'}
	}
	else {return dec.toString();}
}
// Turns any number between 0-255 into a string of its hexadecimal value
var hex = function(decimal) {
	var o=parseInt(decimal%16,10);
	var t=parseInt(decimal/16,10);
	return hexadecimize(t)+hexadecimize(o)
}

// Changes the color of the single color output
// Also changes the output values for each slider
var changeColor = function() {
	redSingleSliderValue.innerHTML=r;
	greenSingleSliderValue.innerHTML=g;
	blueSingleSliderValue.innerHTML=b;	
	h = '#'+hex(r)+hex(g)+hex(b);
	rgb = r.toString()+' , '+g.toString()+' , '+b.toString()
	singleColorOutput.style.backgroundColor=h;
	rgbValue.innerHTML='RGB: ('+rgb+')';
	hexValue.innerHTML='Hexadecimal: '+h;
}

// Event Listeners
redSingleSlider.addEventListener('input',function() {
	r = intigize(redSingleSlider.value);
	changeColor();
});

greenSingleSlider.addEventListener('input',function() {
	g = intigize(greenSingleSlider.value);
	changeColor();
});

blueSingleSlider.addEventListener('input',function() {
	b = intigize(blueSingleSlider.value);
	changeColor();
});

saveColorButton.addEventListener('mousedown', function() {
	var colorInfo = singleColorOutput.innerHTML;
	savedColorsScrollCont.innerHTML+='<div class="savedColors" style="background-color:'+h+'">'
								+colorInfo
							+'</div>';
	savedColorsContainer.scrollLeft+=2000;

})

randomColorButton.addEventListener('mousedown', function() {
	r = parseInt(Math.random()*255,10);
	g = parseInt(Math.random()*255,10);
	b = parseInt(Math.random()*255,10);
	redSingleSlider.value=r;
	greenSingleSlider.value=g;
	blueSingleSlider.value=b;
	changeColor();
})

// Initialize
changeColor();