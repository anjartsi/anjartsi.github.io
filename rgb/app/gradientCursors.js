var drawCursor = function(ctx,x,y,text) {
	ctx.save();
	ctx.translate(x,y);
	ctx.fillStyle = 'black';
	ctx.fillRect(-1,-6,2,4);
	ctx.fillRect(-6,-1,4,2);
	ctx.fillRect(-1,2,2,4);
	ctx.fillRect(2,-1,4,2);
	ctx.scale(1,-1);
	ctx.font = "16px serif";
	var notCent = true;
	if(x<60) {
		ctx.textAlign='left';
		ctx.translate(10,4);
	}
	else if(x>sideLength-60) {
		ctx.textAlign='right'; 
		ctx.translate(-10,4);
	}
	else {
		ctx.translate(0,20);
		if(y<30) {ctx.translate(0,-30);}
		ctx.textAlign = 'center';
		notCent=false;
	}

	if(y>sideLength-20&&notCent) {ctx.translate(0,10);}
	else if(y<20&&notCent) {ctx.translate(0,-10);}
	ctx.fillText(text,0,0);
	ctx.restore();
}

// Prints a div of the clicked color, along with its RGB and hexadecimal color values
var printColor = function(r,g,b) {

	document.getElementById('savedGradientColorsScrollCont').innerHTML+='<div class="savedColorsGradient" style="background-color:'
	+outputRGB(r,g,b)+'"><div>'+outputRGB(r,g,b).toUpperCase()+'<br>#'+hex(r)+hex(g)+hex(b)+'</div></div>';
	document.getElementById('savedGradientColorsContainer').scrollLeft += 2000;
}

redCanvas.addEventListener('mousedown',function(){
	changeRedGradient(ctxRed);
	var r = redGradSlider.value;
	var g = 255-event.offsetY
	var b = event.offsetX;
	drawCursor(ctxRed,b,g,outputRGB(r,g,b));
	printColor(r,g,b);
})

greenCanvas.addEventListener('mousedown',function(){
	changeGreenGradient(ctxGreen);
	var r = event.offsetX;
	var g = greenGradSlider.value;
	var b = 255-event.offsetY;
	drawCursor(ctxGreen,r,b,outputRGB(r,g,b));
	printColor(r,g,b);
})

blueCanvas.addEventListener('mousedown',function(){
	changeBlueGradient(ctxBlue);
	var r = 255-event.offsetY
	var g = event.offsetX;
	var b = blueGradSlider.value;
	drawCursor(ctxBlue,g,r,outputRGB(r,g,b));
	printColor(r,g,b);
})

// Initialize
drawCursor(ctxRed,30,215,outputRGB(215,215,30));
drawCursor(ctxGreen,215,30,outputRGB(215,215,30));
drawCursor(ctxBlue,215,215,outputRGB(215,215,30));
