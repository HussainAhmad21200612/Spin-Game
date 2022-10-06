var level = 0;
var start = false;
var col = ["red", "blue", "green", "yellow"];
var pattern = []
userClickedPattern = []
$(document).keydown(function() {
  if (!start) {
    $("#level-title").text("LEVEL " + level);
    nextSequence();

    start = true;
  }
});
$(".btn").click(handler);

function handler() {
  var col = $(this).attr("id");
  userClickedPattern.push(col);
  playSound(col);
  animatePress(col)

  checkAnswer(userClickedPattern);
}


function playSound(name) {
  var aud = new Audio(name + ".mp3");
  aud.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function checkAnswer(rr) {
  var cols = rr.pop();
  if (cols == pattern.pop()) {

    if (userClickedPattern.length === pattern.length) {


      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    $("h1").text("Game Over. Press Any Key To Restart .");
    startNew();
  }

}

function startNew() {
  level = 0;
  pattern = [];
  start = false;
}

function nextSequence() {
  userClickedPattern = [];

  $("#level-title").text("Level " + level);
  level++;
  var random = Math.floor(Math.random() * 4);
  var chosen = col[random];
  pattern.push(chosen);


  $("#" + chosen).fadeOut(100).fadeIn(100);;
  var aud = new Audio(chosen + ".mp3");
  aud.play();

}
