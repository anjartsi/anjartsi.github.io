// All units in meters and seconds (or some combination of the two)
var x;
var y; 
var vx;
var vy;
var ax;
var ay;
var t=0;
var dt=0.01;
var started;

/*
 This is our jQuery on ready function. This will only execute when the HTML and CSS has finished loading
 which prevents the javascript from executing before all the HTML exists and is properly sized/placed.

 Inside this, we will do all of our initializations since this will be run as soon as the page is loaded.
*/
$(function() {
	// Default action is to throw it up
	throwUp();

	// This will take care of registering all of our event listeners
	initEventListeners();
});

// Default action is to throw it up
throwUp();

/*
Returns a string to be passed into the .css({left:"string_here"}) function 
Sets the x-coordinate of the ball
x=0 is considered to be 10 pixels away from the left of the screen (can change if necessary)
*/
function leftCoord() {
	return x + 10+"px";
}

/**
Returns a string to be passed into .css({top:"string_here"})  
Sets the y-coordinate of the ball
x=0 is considered to be 485 pixels away from the top of the screen (can change if necessary)
*/
function topCoord() {
	return 485-y+"px";
}

// sets the ball's location to the position defined by x and y
function moveBall() {
		$('.ball').css({
			left:leftCoord(),
			top :topCoord(),
		});
		$('.ballx').css({left:leftCoord()});
		$('.bally').css({top : topCoord()});
}

// prints all the initial values of the variables into the html table
function printInitials() {

	$('#x0').html(x.toFixed(2)+' m');
	$('#y0').html(y.toFixed(2)+' m');
	$('#vx0').html(vx.toFixed(2)+' m/s');
	$('#vy0').html(vy.toFixed(2)+' m/s');
}

// prints all of the final/current values of the vairables in the table
function printFinals() {

	$('#xf').html(x.toFixed(2)+' m');
	$('#yf').html(y.toFixed(2)+' m');
	$('#vxf').html(vx.toFixed(2)+' m/s');
	$('#vyf').html(vy.toFixed(2)+' m/s');
	$('#time').html(t.toFixed(3)+' m/s');
}

/*
Running this function once moves time forward by an amount of dt
The position of the ball moves in the appropriate direction 
The velocity of the ball changes wrt the appropriate accelerations
*/
function move() {
		x += vx*dt;
		y += vy*dt; 

		moveBall();
		printFinals();
		vx+=ax*dt;
		vy+=ay*dt;
		t+=dt;	
}

// sets the initial conditions to throw the ball upwards from the ground
function throwUp() {
	x=0;
	y=0; 
	vx = 40;
	vy = 70;
	ax = 0;
	ay = -9.8;
	t=0;

	moveBall();
	printInitials();
}

// sets the initial conditions to throw the ball horizontally from above the ground
function throwSide() {
	x=0;
	y=200; 
	vx = 80;
	vy = 0;
	ax = 0;
	ay = -9.8;
	t=0;

	moveBall();
	printInitials();
}

// begins moving the ball
function start() {
	if(!started) {
		started = setInterval(function(){
			move();
		},10);
	}
}

// stops the ball from moving
function stop() {
	window.clearInterval(started)
	started = null;
}

/*
	There is quite a bit going on here. First note the different way for declaring functions.
	This is actually the preferred manner since it leaves the global namespace clobber free (
	otherwise, a function and a variable could end up with the same name).

	We are using this method to set event listeners. This is the preferred way to react to user's
	clicking, typing, etc. onClick and all of that is unreliable and limits you because you have
	to type it on every element that receives the message. Doing it programmatically is better
	since the event bubbles up (all of its parents receive the message too) which will help
	us out with more complex events.
*/
var initEventListeners = function() {
	// You can read the jquery documenation on this. This is a jquery shortcut for
	// window.addEventListener('click', functoin(){}); Both work perfectly the same
	$('#start-button').click(start);
	$('#stop-button').click(stop);
	$('#throw-up-button').click(throwUp);
	$('#throw-side-button').click(throwSide);
}