// Returns a string in the form of : 'rgb(0,0,0)'
var outputRGB = function(r,g,b) {
	return 'rgb('+r+','+g+','+b+')';
};


var redCanvas = document.getElementById('redCanvas');
var greenCanvas = document.getElementById('greenCanvas');
var blueCanvas = document.getElementById('blueCanvas');

var ctxRed = redCanvas.getContext('2d');
var ctxGreen = greenCanvas.getContext('2d');
var ctxBlue = blueCanvas.getContext('2d');

// Canvas Side Lengths
var sideLength = 255;
redCanvas.height=sideLength;
redCanvas.width=sideLength;
greenCanvas.height=sideLength;
greenCanvas.width=sideLength;
blueCanvas.height=sideLength;
blueCanvas.width=sideLength;

var redGradSlider = document.getElementById('redGradSlider'); // The slider
var redGradValue = document.getElementById('redGradValue'); // The OUTPUT VALUE of the slider that is printed on screen

var greenGradSlider = document.getElementById('greenGradSlider');
var greenGradValue = document.getElementById('greenGradValue');

var blueGradSlider = document.getElementById('blueGradSlider');
var blueGradValue = document.getElementById('blueGradValue');


var redSliderGradient = redGradSlider.value;
var greenSliderGradient = greenGradSlider.value;
var blueSliderGradient = blueGradSlider.value;

// Makes the bottom-left corner the (0,0) point
var translateXY = function(ctx) {
	ctx.translate(0,redCanvas.height);
	ctx.scale(1,-1);
}
translateXY(ctxRed);
translateXY(ctxGreen);
translateXY(ctxBlue);

// Red Graient
// Green vs. Blue
var createRedGradient = function(ctx) {
	var gradient;
	for(var i=0;i<sideLength;i++) {
		gradient = ctx.createLinearGradient(0,0,1,sideLength);
		gradient.addColorStop(0,outputRGB(redSliderGradient,0,Math.floor(i*255/sideLength)));
		gradient.addColorStop(1,outputRGB(redSliderGradient,255,Math.floor(i*255/sideLength)));
		ctx.save();
		ctx.fillStyle = gradient;
		ctx.translate(i,0);
		ctx.fillRect(0,0,1,sideLength);
		ctx.restore();
	}
}

// Green Gradient:
// Blue vs. Red
var createGreenGradient = function(ctx) {
	var gradient;
	for(var i=0;i<sideLength;i++) {
		gradient = ctx.createLinearGradient(0,0,1,sideLength);
		gradient.addColorStop(0,outputRGB(Math.floor(i*255/sideLength),greenSliderGradient,0));
		gradient.addColorStop(1,outputRGB(Math.floor(i*255/sideLength),greenSliderGradient,255));
		ctx.save();
		ctx.fillStyle = gradient;
		ctx.translate(i,0);
		ctx.fillRect(0,0,1,sideLength);
		ctx.restore();
	}
}

// Blue Gradient:
// Red vs. Green
var createBlueGradient = function(ctx) {
	var gradient;
	for(var i=0;i<sideLength;i++) {
		gradient = ctx.createLinearGradient(0,0,1,sideLength);
		gradient.addColorStop(0,outputRGB(0,Math.floor(i*255/sideLength),blueSliderGradient));
		gradient.addColorStop(1,outputRGB(255,Math.floor(i*255/sideLength),blueSliderGradient));
		ctx.save();
		ctx.fillStyle = gradient;
		ctx.translate(i,0);
		ctx.fillRect(0,0,1,sideLength);
		ctx.restore();
	}
}

// What happens when the pallet has to change
var changeRedGradient = function(ctx) {
	redSliderGradient = redGradSlider.value; //get value from input
	redGradValue.innerHTML = redSliderGradient; //change output value
	createRedGradient(ctx); // draw on the canvas
}

var changeGreenGradient = function(ctx) {
	greenSliderGradient = greenGradSlider.value;
	greenGradValue.innerHTML = greenSliderGradient;
	createGreenGradient(ctx);
}

var changeBlueGradient = function(ctx) {
	blueSliderGradient = blueGradSlider.value;
	blueGradValue.innerHTML = blueSliderGradient;
	createBlueGradient(ctx);
}


//Event Listeners for the Gradient Sliders
redGradSlider.addEventListener('input',function() {
	r = intigize(redGradSlider.value);
	changeRedGradient(ctxRed);
});

greenGradSlider.addEventListener('input',function() {
	r = intigize(greenGradSlider.value);
	changeGreenGradient(ctxGreen);
});

blueGradSlider.addEventListener('input',function() {
	r = intigize(blueGradSlider.value);
	changeBlueGradient(ctxBlue);
});

// Initialize
createRedGradient(ctxRed);
createGreenGradient(ctxGreen);
createBlueGradient(ctxBlue);