var red = document.getElementById('red');
var green = document.getElementById('green');
var blue = document.getElementById('blue');
var colorBox = document.getElementById('colorBox');
var redValue = document.getElementById('redValue');
var greenValue = document.getElementById('greenValue');
var blueValue = document.getElementById('blueValue');
var colName = document.getElementById('colName');
var saveColorButton = document.getElementById('saveColorButton');
var randomizeButton = document.getElementById('randomizeButton');
var savedColors = document.getElementById('savedColors');
var r = 150;
var g = 150;
var b = 150;
var h = '';
var nh = '';
var rgb = '';
// Returns an integer value of a given string
// Because I've heard parseInt messes up the variable
var intigize = function(string) {
	var x = string;
	return parseInt(x,10);
}

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

var hex = function(decimal) {
	var o=parseInt(decimal%16,10);
	var t=parseInt(decimal/16,10);
	return hexadecimize(t)+hexadecimize(o)
}

var changeColor = function() {
	redValue.innerHTML=r;
	greenValue.innerHTML=g;
	blueValue.innerHTML=b;	
	h = '#'+hex(r)+hex(g)+hex(b);
	rgb = r.toString()+' , '+g.toString()+' , '+b.toString()
	colorBox.style.backgroundColor=(h);
	colName.innerHTML='RGB: '+rgb;
	colName.innerHTML+='<br>Hexadecimal: '+h;
}

red.addEventListener('input',function() {
	r = intigize(red.value);
	changeColor();
});

green.addEventListener('input',function() {
	g = intigize(green.value);
	changeColor();

});

blue.addEventListener('input',function() {
	b = intigize(blue.value);
	changeColor();
});

saveColorButton.addEventListener('mousedown', function() {
	savedColors.innerHTML+='<div class="savedCols" style="background-color:'+h+'">'
								+'<div>RGB: '+rgb+'<br>Hexadecimal: '+h+'</div>'
							+'</div>'
})

randomizeButton.addEventListener('mousedown', function() {
	r = parseInt(Math.random()*255,10);
	g = parseInt(Math.random()*255,10);
	b = parseInt(Math.random()*255,10);
	red.value=r;
	green.value=g;
	blue.value=b;
	changeColor();
})

changeColor();