let myGame;
$(document).ready(function() {	
	// Create buttons on keyboard
	prepareKeyboard();
	
	// set up game
 	myGame = new Hangman();
 	myGame.alphaKeyboard();

	// When window is resized
	$(window).resize(resizeButtons);
	$(window).resize(function() {
		// $("#can").height($(window).height() * 0.40);
		myGame.redraw();
	});

	// Keyboard Buttons Event Listeners
	$('.LetterBtn').mouseup(function(e) {
		myGame.guessLetter($(this).html());
	})

	$('#qwertyBtn').mouseup(function(e) {
		myGame.qwertyKeyboard();
	})

	$('#alphaBtn').mouseup(function(e) {
		myGame.alphaKeyboard();
	})

	$('#giveUpBtn').mouseup(function(e) {
		myGame.alphaKeyboard();
	})

	$('.startNewGame').mouseup(function(e) {
		myGame = new Hangman();
		myGame.alphaKeyboard();
		$("#newGameMsg").removeClass("hide");
		$("#keyboard").removeClass("hide");
		$("#victory").addClass("hide");
		$("#defeat").addClass("hide");
	})

	$('#startNewGameBtn').mouseup(function(e) {
		myGame.guessesLeft = 0;
		myGame.redraw();
		myGame.lose();
	})

	$('#keepTryingBtn').mouseup(function(e) {
		$("#keepTryingMsg").removeClass("hide");
	})

	// Keyboard listener on the entire window
	$(window).keyup(function(e) {
		let pressed = e.keyCode;
		// If a letter key has been pressed
		if(pressed >= 65 && pressed < 65 + 26) {
			myGame.guessLetter(String.fromCharCode(pressed));
		}
	})
}) // End document.ready()

function prepareKeyboard() {
	// First Row - 12 keys
	for(let i = 0; i < 10; i++) {
		$(".keyboardRow")[0].append(createLetterBtn());
	}
	// Second Row - 9 keys
	for(let i = 0; i < 9; i++) {
		$(".keyboardRow")[1].append(createLetterBtn());
	}
	// Third Row - 7 keys
	for(let i = 0; i < 7; i++) {
		$(".keyboardRow")[2].append(createLetterBtn());
	}

	resizeButtons();
}

// Used in the prepareKeyboard method
// Is this what a subroutine is?
function createLetterBtn() {
	let newbtn = document.createElement("button");
	$(newbtn).addClass('btn btn-default LetterBtn');
	return newbtn;
}

// Dynamically resize the keyboard buttons based on the 
// width of their parent container (.keyboardRow)
function resizeButtons() {
	$(".LetterBtn").each(function() {
		let w = $(this).parent().width();
		// the +1 is to include $(this) with its siblings
		let n = $(this).siblings().length + 1;
		// the *3 is just a magic number that worked the best
		$(this).width(w / (3 * n));
	})
}
