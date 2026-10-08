let userScore = 0;
let comScore = 0;

// left container
const choices = document.querySelectorAll(".leftchoice .choice");
const leftChoice = document.querySelectorAll(".leftchoice .choice");

//right container
const rightChoice = document.querySelectorAll(".rightchoice .choice");

// mid container
const msg = document.querySelector("#msg");
const userscorePara = document.querySelector("#user-score");
const comscorePara = document.querySelector("#com-score");
const userImg = document.querySelector("#img-left");
const comImg = document.querySelector("#img-right");

userImg.style.display = "none";
comImg.style.display = "none";

// mapping (id → image file)
const mapImg = {
  rock: "rock.png",
  paper: "paper (1).png",
  scissor: "scissors.png",
};

let index = 0;
let loop;

// function for color loop..
const colorloop = () => {
  clearInterval(loop);
  loop = setInterval(() => {
    // remove boder in current index..
    leftChoice.forEach((c) => c.classList.remove("active"));
    rightChoice.forEach((c) => c.classList.remove("active"));

    // add boder in current index..
    leftChoice[index].classList.add("active");
    rightChoice[index].classList.add("active");
    // increase the index
    index = (index + 1) % choices.length;
  }, 500);
};
colorloop();
// function for stop color loop...
const stoploop = () => {
  clearInterval(loop);
};

// adding event listener for user choice..
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userchoice = choice.getAttribute("id");
    stoploop(); // function call for colorloop stop
    playGame(userchoice);
  });
});

// Computer choice function..
const gencomputerChoice = () => {
  const options = ["rock", "paper", "scissor"];
  const randomIdx = Math.floor(Math.random() * 3);
  return options[randomIdx];
};
// Game draw function..
const drawGame = () => {
  msg.innerHTML = "Game was Draw! Play again.";
  msg.style.backgroundColor = "black";
};

// Game logic and rule function..
const playGame = (userchoice) => {
  const comChoice = gencomputerChoice();

  userImg.src = mapImg[userchoice]; //user choice  img
  comImg.src = mapImg[comChoice]; // computer choice img
  userImg.style.display = "block";
  comImg.style.display = "block";

  if (userchoice === comChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userchoice === "rock") {
      // left choices paper/scissor
      userWin = comChoice === "paper" ? false : true;
    } else if (userchoice === "paper") {
      // left choices rock/scissor
      userWin = comChoice === "scissor" ? false : true;
    }
    // left choices paper/rock
    else {
      userWin = comChoice === "rock" ? false : true;
    }
    showWiner(userWin, userchoice, comChoice);
  }
  // for 2 sec delay for new game...
  setTimeout(() => {
    msg.innerHTML = "Play your Game";
    msg.style.backgroundColor = "";
    colorloop();
  }, 2000);
};

// Show winning and lose function...
const showWiner = (userWin, userchoice, comChoice) => {
  if (userWin) {
    userScore++;
    userscorePara.innerText = userScore;
    msg.innerHTML = `You win! ${userchoice} beats ${comChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    comScore++;
    comscorePara.innerText = comScore;
    msg.innerHTML = `You lose ${comChoice} beats your ${userchoice}`;
    msg.style.backgroundColor = "red";
  }
};
