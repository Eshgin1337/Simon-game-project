var colorsForButtons = ["red", "blue", "green", "yellow"];
var gamePattern = []
var userClicks = []
var gameStarted = false;
var current_level = 0;
var numberOfChances = 3;

$(".btn").click(function () {
  userClicks.push(this.id);
  playSound(this.id);
  animateWhenPressed(this.id);
  // If the user clicks n times there will be n elements in userClicks array, and n - 1 will be index of the last element.
  checkClicks(userClicks.length - 1);
});

function nextRound() {
    userClicks = [];
    current_level++;
    document.querySelector('#level-title').innerHTML = `Level ${current_level}`;
    var randomNumber = Math.floor(Math.random()*4);
    var randomColour = colorsForButtons[randomNumber];
    gamePattern.push(randomColour);
    $(`#${randomColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColour);
}


$(document).keypress(function () {
	if (!gameStarted) {
		numberOfChances = 3;
		document.getElementById('help').disabled = false;
		document.getElementById('chances').innerHTML = "You have 3 chances to get help.";
		document.getElementById('chances').style.color = "#4AA96C";
		document.querySelector('#level-title').innerHTML = `Level ${current_level}`;
		nextRound();
		gameStarted = true;
	}
})


//
 function animateWhenPressed(currentColor) {
	document.getElementById(currentColor).classList.add("pressed");
	setTimeout(() => {
	document.getElementById(currentColor).classList.remove("pressed");
	}, 100);
}


// To play the required sound.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play(); 
}


function checkClicks(level) {
  // If the user's answer's index coincides with the index of the last button animated it means the user chose correct option
	if(userClicks[level] === gamePattern[level]) {
	// If the user is done with the number of clicks the nextRound function will get triggered.

	if (userClicks.length === gamePattern.length) {
		// When the player is done with clicking, after waiting for a second the next round will start by calling nextRound function.
		setTimeout(() => {
		nextRound();
		}, 1000);
	}

	} else {
		animateGameOver();
		// To reset all values
		startAgain();
	}
}
  
// If the user guesses any of the answer wrong. The sound which is responsible for the wrong answer will be played with playSound function.
      
// For making failure eye-catching, we should give some GameOver animation to the body for a short time by adding game-over class to the 
// body of the web application.
function animateGameOver() {
	playSound("wrong");
	document.body.classList.add('game-over');
	setTimeout(() => {
	document.body.classList.remove('game-over');
	}, 200);
	document.getElementById('level-title').innerHTML = "Game Over, Press Any Key to Restart";
	disableHelp();
}


// If the user fails to follow game patterns the startAgain function will get triggered to reset all values to default.
function startAgain() {
	gamePattern = [];
	current_level = 0;
	gameStarted = false;
}



// If the user forgets the sequence, help him once to learn sequence.
document.getElementById('help').addEventListener('click', function () {
	if (numberOfChances > 0) {
		getHelp();
		numberOfChances--;
		document.getElementById('chances').innerHTML = `You have ${numberOfChances} chances left!`;
		if (numberOfChances === 2) {
			document.getElementById('chances').style.color = "#66DE93";
		}
		if (numberOfChances === 1) {
			document.getElementById('chances').style.color = "#D83A56";
		}
		if ( numberOfChances === 0) {
			disableHelp();
		}
	}
});


function getHelp(params) {
	var numberOfClicks = 0;
	const clicks = setInterval(() => {
		$(`#${gamePattern[numberOfClicks]}`).fadeIn(100).fadeOut(100).fadeIn(100);
		playSound(gamePattern[numberOfClicks]);
		if (numberOfClicks === gamePattern.length) {
		clearInterval(clicks);
		} else {
		numberOfClicks++;
		}
	}, 500);
}


// After the user runs out of helps. Do this.
function disableHelp() {
	document.getElementById('chances').innerHTML = `You do not have any chances left!`;
	document.getElementById('help').disabled = true;
	document.getElementById('chances').style.color = "#FF0000";
  }
