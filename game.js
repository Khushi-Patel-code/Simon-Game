var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//next sequence only when a button is pressed
$(document).on("keypress", function () {
  if (!started) {
    level = 0;
    nextSequence();
    started = true;
  } else {
    nextSequence();
  }
});

function nextSequence() {
  level++;
  $("h1").text("Level " + level); //updated every time a new level reached

  var randomNumber = Math.floor(Math.random() * 4); //random number from 0 to 3
  var randomChosenColour = buttonColours[randomNumber]; //Selecting a random colour from the array of colours

  gamePattern.push(randomChosenColour); //adding the random colour to the gamePattern array

  animatePress(randomChosenColour); //adds the flash effect
  playSound(randomChosenColour); //Plays the sound for the button

  userClickedPattern = []; //Clearing the userClickedPattern array for the next level
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").on("click", function (event) {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour); //Creating the userChosenColour pattern

  console.log(userClickedPattern); // Logs the path

  animatePress(userChosenColour); //Adds the flash effect
  playSound(userChosenColour); //Plays the button sound whenever the user clicks the button

  const indexCheck = userClickedPattern.length - 1; //to get the latest index
  checkAnswer(indexCheck); //Checking the pattern
});

function animatePress(currentColour) {
  $("#" + currentColour)
    .fadeOut(100)
    .fadeIn(100);

  //to create that grey flash effect
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      //Calling nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over! Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
