var timesDied = 0;
var timesWon = 0;
class Hangman {
	constructor() {
		this.maxGuesses = 6;
		this.guessesLeft = 6;
		this.word = words[Math.floor(Math.random() * words.length)].toUpperCase();
		this.disabledLetters = "";
		this.kButtonClass = ".LetterBtn";
		
		$("#answerGuessed").text(this.dashes()); 
		this.updateDoc(null);

		// Canvas
		this.ctx = document.getElementById("can").getContext('2d');
		this.redraw();
	}

	// Returns the correct number of _'s for to 
	// write onto the document
	dashes() {
		let blanks = "";
		for(let i = 0; i < this.word.length; i++) {
			blanks +="_";
		}
		// put spaces in between each _  
		blanks = blanks.split('').join(' ');
		return blanks
	}

	// Updates information that is printed on the document
	updateDoc(letter) {
		$("#timesWon").html(timesWon);
		$("#timesDied").html(timesDied);
		$("#guessesLeft").html(this.guessesLeft);
		
		let ans; // the answer that is printed onthe screen
		let index = this.word.search(letter);
		while(index != -1) {
			// loop through all instances of the guessed letter
			ans = $("#answerGuessed").text();
			ans = ans.split(' ');
			ans[index] = letter;
			ans = ans.join(' ');
			$("#answerGuessed").text(ans);
			this.word = this.word.replace(letter, letter.toLowerCase());
			index = this.word.search(letter);
		}
	}

	// Handles the user input
	guessLetter(ltr) {
		if(this.guessesLeft == 0) return null;
		let letter = ltr.toUpperCase();
		// If the letter hasn't already been guessed yet
		if(!this.disabledLetters.includes(letter)) {
			this.disabledLetters += letter;
			this.disableButton(letter);
			
			// Correct Guess
			if(this.word.includes(letter)) {
				this.updateDoc(letter);
				this.guessedRight(letter);
			}
			// Incorrect Guess
			else {
				this.guessedWrong(letter);
				this.updateDoc(letter);
			}
		}
	} // End guessLetter()

	guessedRight(letter) {
		$(this.kButtonClass).addClass("btn-success");
		$(this.kButtonClass).removeClass("btn-primary btn-default");
		if(this.word == this.word.toLowerCase()) {
			this.win();
		}
		this.redraw();
	}

	guessedWrong(letter) {
		this.guessesLeft--;
		$("#guessesLeft").html(this.guessesLeft);
		$(this.kButtonClass).addClass("btn-primary");
		$(this.kButtonClass).removeClass("btn-success btn-default");
		if(this.guessesLeft == 0) {
			this.lose();
		}
		this.redraw();
	}

	win() {
		$("#keyboard").addClass("hide");
		$("#victory").removeClass("hide");
		timesWon++;
		$("#timesWon").html(timesWon);
	}

	lose() {
		$("#keyboard").addClass("hide");
		$("#defeat").removeClass("hide");
		timesDied++;
		$("#timesDied").html(timesDied);
		$("#showAnswer").text(this.word.toUpperCase());

	}


	// Disables the given letter on the keyboard
	disableButton(letter) {
		$(this.kButtonClass).each(function() {
			if($(this).text() == letter) {
				$(this).addClass("disabled");
			}
		})
	}

	// Changes the keyboard layout to QWERTY
	qwertyKeyboard() {
		let qwerty = "QWERTYUIOPASDFGHJKLZXCVBNM";
		let c;
		let disabled = this.disabledLetters;
		$(this.kButtonClass).each(function(i) {
			$(this).removeClass("disabled");
			c = qwerty[i];
			$(this).html(c);
			if(disabled.includes(c)) {
				$(this).addClass("disabled");
			}
		})
		$("#qwertyBtn").addClass("disabled");
		$("#alphaBtn").removeClass("disabled");
	}

	// changes the keyboard layout to alphabetical
	alphaKeyboard() {
		let a = 65;
		let c;
		let disabled = this.disabledLetters;
		$(this.kButtonClass).each(function(i) {
			$(this).removeClass("disabled");
			c = String.fromCharCode(a + i);
			$(this).html(c);
			if(disabled.includes(c)) {
				$(this).addClass("disabled");
			}
		})
		$("#alphaBtn").addClass("disabled");
		$("#qwertyBtn").removeClass("disabled");

	}

	drawGallows() {
		// Get the current dimensions of the canvas
		let w = document.getElementById("can").width;
		let h = document.getElementById("can").height;
		
		let left, top, wd, ht;

		// The different parts of the gallows
		let base = new Path2D();
		let post = new Path2D();
		let bar = new Path2D();
		let rope = new Path2D();
		
		// Everything is based on a percentage of w and h
		// This will make the image scale with different screen sizes
		// Math.floor() prevents canvas from trying to draw 
		// in fractions of pixels
		left = Math.floor(w * 0.1);
		top = Math.floor(h * 0.4);
		wd = Math.floor(w * 0.25);
		ht = Math.floor(h * 0.05);
		base.rect(left, top, wd, ht);
		
		left = Math.floor(w * 0.215);
		top = Math.floor(h * -0.35);
		wd = Math.floor(w * 0.025);
		ht = Math.floor(h * 0.8);
		post.rect(left, top, wd, ht);

		left = Math.floor(w * -0.035);
		top = Math.floor(h * -0.35);
		wd = Math.floor(w * 0.25);
		ht = Math.floor(h * 0.025);
		bar.rect(left, top, wd, ht);

		left = Math.floor(w * -0.035);
		top = Math.floor(h * -0.35);
		wd = Math.floor(w * 0.015);
		ht = Math.floor(h * 0.1);
		rope.rect(left, top, wd, ht);

		this.ctx.fill(base);
		this.ctx.fill(post);
		this.ctx.fill(bar);
		this.ctx.fill(rope);
	} // end drawGallows()

	// This is done in a similar way as drawGallows()
	// With the main difference being the entire body does 
	// not get drawn at once
	drawBody(count) {
		// Get the current dimensions of the canvas
		let w = document.getElementById("can").width;
		let h = document.getElementById("can").height;

		// The coordinates of the bottom end of the rope from drawGallows
		let ropeX = Math.floor(w * -0.0275);
		let ropeY = Math.floor(h * -0.25);
		
		let headRadius = Math.floor(h * 0.1);
		
		let head = new Path2D();
		head.arc(ropeX, ropeY + headRadius, headRadius, 0, 2 * Math.PI)

		let torsoLength = Math.floor(2 * headRadius);
		
		let torso = new Path2D();
		torso.moveTo(ropeX, ropeY + 2 * headRadius);
		torso.lineTo(ropeX, ropeY + 2 * headRadius + torsoLength);
		
		let shoulder = Math.floor(ropeY + 2 * headRadius + torsoLength / 3);
		
		let armL = new Path2D();
		armL.moveTo(ropeX, shoulder);
		armL.lineTo(ropeX - 2 * headRadius, ropeY + 2 * headRadius);
		
		let armR = new Path2D();
		armR.moveTo(ropeX, shoulder);
		armR.lineTo(ropeX + 2 * headRadius, ropeY + 2 * headRadius);

		let hip = Math.floor(ropeY + 2 * headRadius + torsoLength);
		
		let legL = new Path2D();
		legL.moveTo(ropeX, hip);
		legL.lineTo(ropeX - 1.5 * headRadius, hip + 2 * headRadius);
		
		let legR = new Path2D();
		legR.moveTo(ropeX, hip);
		legR.lineTo(ropeX + 1.5 * headRadius, hip + 2 * headRadius);

		let bodyParts = [head, torso, armL, armR, legL, legR];
		for(let i = 0; i < count; i++) {
			this.ctx.fill(bodyParts[i]);
			this.ctx.stroke(bodyParts[i]);
		}
	} // End drawBody()

	redraw() {
		let w = document.getElementById("can").width;
		let h = document.getElementById("can").height;
		
		this.ctx.clearRect(0, 0, w, h);
		
		this.ctx.save();
		this.ctx.translate(w / 2, h / 2);
		this.ctx.fillStyle = "#d00d2d"
		this.drawGallows();
		
		this.ctx.strokeStyle = "white";
		this.ctx.fillStyle = "white";
		this.ctx.lineWidth = 3;
		if(this.guessesLeft == 0) {

			this.ctx.fillStyle = "#d00d2d";
			this.ctx.strokeStyle = "#d00d2d";
		}
		this.drawBody(this.maxGuesses - this.guessesLeft);
		
		this.ctx.restore();
	}
} // End class Hangman