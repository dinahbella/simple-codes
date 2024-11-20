var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
// if we click on start/reset
document.getElementById("start").onclick = function () {
  // if we are playing
  if (playing == true) {
    // reload page
    location.reload();
  } else {
    // change to playing mode
    playing = true;
    // if we are not playing
    // set score to zero

    score = 0;
    document.getElementById("scorevalue").innerHTML = score;
    // show countdown box
    show("timeremaining");
    timeremaining = 60;
    document.getElementById("timevalue").innerHTML = timeremaining;
    // hide game over box
    hide("gameover");
    // change button to reset
    document.getElementById("start").innerHTML = "Reset Game";
    // reduce time by 1 sec
    startCountdown();
    generateQA();
  }
};
// loops;
// yes-> continue
// no-> continue

for (i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function () {
    //check if we are playing
    if (playing == true) {
      //yes
      if (this.innerHTML == correctAnswer) {
        //correct answer

        //increase score by 1
        score++;
        document.getElementById("scorevalue").innerHTML = score;
        //hide wrong box and show correct box
        hide("wrong");
        show("correct");
        setTimeout(function () {
          hide("correct");
        }, 1000);

        //Generate new Q&A

        generateQA();
      } else {
        //wrong answer
        hide("correct");
        show("wrong");
        setTimeout(function () {
          hide("wrong");
        }, 1000);
      }
    }
  };
}

// yes
// showc correct answer for 1 sec
// generate Q/A

function generateQA() {
  var x = 1 + Math.round(9 * Math.random());
  var y = 1 + Math.round(9 * Math.random());
  correctAnswer = x * y;
  document.getElementById("question").innerHTML = x + "x" + y;
  var correctPosition = 1 + Math.round(3 * Math.random());
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer

  //fill other boxes with wrong answers

  var answers = [correctAnswer];

  for (i = 1; i < 5; i++) {
    if (i != correctPosition) {
      var wrongAnswer;
      do {
        wrongAnswer =
          (1 + Math.round(9 * Math.random())) *
          (1 + Math.round(9 * Math.random())); //a wrong answer
      } while (answers.indexOf(wrongAnswer) > -1);
      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}
// no
// show try again box for 1 sec
function startCountdown() {
  action = setInterval(function () {
    timeremaining -= 1;
    // time left
    document.getElementById("timevalue").innerHTML = timeremaining;
    if (timeremaining == 0) {
      // game over
      stopCountdown();
      show("gameover");
      document.getElementById("gameover").innerHTML =
        "<p>Game Over!</p><p>Your Score is " + score + ".</p>";
      //   hide certain elements
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("start").innerHTML = "Start Game";
    }
  }, 1000);
}
function stopCountdown() {
  clearInterval(action);
}
function hide(id) {
  document.getElementById(id).style.display = "none";
}
function show(id) {
  document.getElementById(id).style.display = "block";
}
