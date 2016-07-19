var playing = null;
var dt = 10;
var springLength	=	parseInt($('#springImage').css('width'));
// springLength = Half the total length of the spring (in equilibrium position)
var equilibrium=2*springLength;//Equilibrium position of the spring
var x=0;	//position
var xprev=0;//the previous iteration of x
var t=0;	//time
//the time t is slower than real time by 10% (30s in real life is recorded as t=27s)
var k=20;	//spring constant
var m=2;	//mass
var amp=3;	//amplitude;
var force;	//force
var v;		//velocity
var period=2*Math.PI*Math.sqrt(m/k);

$(document).ready(function() {
	move();
	markers();
	initEventListeners();
});

var omega = function() {
	return Math.sqrt(k/m);
}

var move = function() {
	xprev=x;
	x=amp*Math.cos(omega()*t);
	$('#springImage').css('width',springLength*(2*amp+x));
	conserveEnergy();
	t+=dt/1000;
}

var conserveEnergy = function() {
	if(x-xprev>0){
		v = Math.sqrt(k*(amp*amp-x*x)/m);
	}
	else{
		v = -1*Math.sqrt(k*(amp*amp-x*x)/m);
	}
	force = -k*x;
	printValues();
}

var printValues = function() {
	$('#velocity').html('Velocity = '+v.toPrecision(3)+' m/s');
	$('#force').html('Spring Force = '+force.toPrecision(3)+' N');
	$('#mass').html('Mass = '+m.toPrecision(3)+' kg');
	$('#springConst').html('Spring Constant (k) = '+k.toPrecision(3)+' N/m');
	$('#amplitude').html('Amplitude = '+amp.toPrecision(3)+' m');
	$('#time').html('Time = '+t.toPrecision(3)+' s');
	$('#position').html('Position = '+x.toPrecision(3)+' m');
	}



var play = function() {
	if(!playing){
		playing=setInterval( function() {
			move();
		},dt);
	};
}

var markers =function() {
	$('#marker1').css('left', springLength*(amp) +'px');
	$('#marker2').css('left', springLength*(amp+amp) + 'px');
	$('#marker3').css('left', springLength*(amp+2*amp) + 'px');
}

var pause = function() {
	window.clearInterval(playing);
	playing=null;
};


var record = function(){
	for (var i = 0; i < 1000; i++) {
		move();
		$('#dataTableBody').append(
				'<tr><td>'+t+'</td><td>'+x+'</td><td>'+v+'</td><td>'+force+'</td></tr>'
			);
	}
}


var shine = function() {
	$(this).css('background-color', '#666666');
};
var unshine = function() {
	$(this).css('background-color', '#333366');
};


var initEventListeners = function() {
	$('#play').click(play);
	$('#pause').click(pause);
	$('#record').click(record);
	$('button').hover(shine,unshine);
	
};
