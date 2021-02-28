
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var started = false;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});

// function for clicking button
$(".btn").click(function(event) {

  if (started === false){

      event.preventDefault();
    }
    else {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
}

});

function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function(){
        nextSequence();
      } ,1000);
    }
  }

  else {

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    } ,200);

    $("#level-title").text("Game Over, Press Any key to Restart.")

    startOver();

  }

}

// selecting random button for game initialization
function nextSequence() {

  userClickedPattern = []
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function startOver() {

  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}

// to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// to animate the button when it clicked
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
       $("#" + currentColour).removeClass("pressed");
   }, 100);
}
