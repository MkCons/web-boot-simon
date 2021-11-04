var gamePattern;
var numButtonClicked;
var gameOver;
var buttonColours = ["red", "blue", "green", "yellow"];

$(document).on("keypress", function() {
  gameSetup();
});

$("h1").on("click", function() {
  gameSetup();
})

function gameSetup() {
  gamePattern = [];
  numButtonClicked =  0;
  gameOver = false;
  levelUp();
}

function levelUp() {
  $("#level-title").text("Level " + (gamePattern.length + 1));

  var next = $("#" + buttonColours[nextSequence()]);
  gamePattern[gamePattern.length] = next.attr("id");
  animate(next);

  new Audio("sounds/"+ next.attr("id") + ".mp3").play();

  numButtonClicked = 0;
}

$(".btn").on("click", function() {
  console.log(this.id);
  console.log(gamePattern[numButtonClicked]);

  animate($("#"+this.id));
  if(gameOver) {
    endGame();
  }
  else if(this.id === gamePattern[numButtonClicked]) {
    new Audio("sounds/"+ this.id + ".mp3").play();
    numButtonClicked++;
    if(numButtonClicked === gamePattern.length) {
      setTimeout(function() {
        levelUp();
      }, 500);
    }
  }
  else {
    gameOver = true;
    $("#level-title").text("Game Over, Press Any Key to Restart");
    endGame();
  }
});

function endGame() {
  new Audio("sounds/wrong.mp3").play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 250);
}

function nextSequence() {
  return Math.floor(Math.random() * 4);
}

function animate(button) {
  button.fadeOut(100).fadeIn(100);
}
