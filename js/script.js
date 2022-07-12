"use strict";

const introBox = document.querySelector(".intro-box");
const topBar = document.querySelector(".top-bar");
const mainGame = document.querySelector(".main-game");

const xLogoSelection = document.querySelector(".x-logo-selection");
const oLogoSelection = document.querySelector(".o-logo-selection");

const selectedPlayer = document.querySelector(".selected-player");

const newGameWithCPU = document.querySelector(".new-game-btn--1");
const newGameWithPlayer = document.querySelector(".new-game-btn--2");

const xGameScore = document.querySelector(".X-score");
const yGameScore = document.querySelector(".Y-score");
const tiesGameScore = document.querySelector(".ties-score");

const gameBlocks = document.querySelectorAll(".game-block");

const gameBlock1 = document.querySelector(".game-block--1");
const gameBlock2 = document.querySelector(".game-block--2");
const gameBlock3 = document.querySelector(".game-block--3");
const gameBlock4 = document.querySelector(".game-block--4");
const gameBlock5 = document.querySelector(".game-block--5");
const gameBlock6 = document.querySelector(".game-block--6");
const gameBlock7 = document.querySelector(".game-block--7");
const gameBlock8 = document.querySelector(".game-block--8");
const gameBlock9 = document.querySelector(".game-block--9");

const winningTeam = document.querySelector(".winning-team");
const losingTeam = document.querySelector(".losing-team");
const tieTeam = document.querySelector(".tie-team");

const gameTurn = document.querySelector(".game-turn__player-x");

const quitBtn = document.querySelectorAll(".quit-btn");
const nextRoundBtn = document.querySelectorAll(".next-round-btn");
const restartBtn = document.querySelector(".restart-game");

// Player Selection
let playerSelected = "X";
xLogoSelection.addEventListener("click", function () {
  playerSelected = "X";
  selectedPlayer.textContent = `Selected Player: ${playerSelected}`;
});

oLogoSelection.addEventListener("click", function () {
  playerSelected = "O";
  selectedPlayer.textContent = `Selected Player: ${playerSelected}`;
});

const getSequence = function () {
  let matrix = [
    [gameBlock1, gameBlock2, gameBlock3],
    [gameBlock4, gameBlock5, gameBlock6],
    [gameBlock7, gameBlock8, gameBlock9],
  ];
  let checked = matrix.map((row) => row.map((element) => null));

  for (let i = 0; i <= matrix.length - 1; i++) {
    for (let j = 0; j <= matrix[i].length - 1; j++) {
      if (matrix[i][j].innerHTML !== "") {
        const logo = matrix[i][j].children[0].classList[0]
          .replace("logo-", "")
          .toUpperCase();
        checked[i][j] = `${logo}`;
      } else {
        checked[i][j] = null;
      }
    }
  }

  return checked;
};

const checkWinners = function (sequence) {
  // Checking for Horizontal wins
  for (let i = 0; i < 3; i++) {
    if (
      sequence[i][0] === sequence[i][1] &&
      sequence[i][1] === sequence[i][2]
    ) {
      const winner = sequence[i][0];
      return winner;
    }
  }

  // Checking for Vertical wins
  for (let i = 0; i < 3; i++) {
    if (
      sequence[0][i] === sequence[1][i] &&
      sequence[1][i] === sequence[2][i]
    ) {
      const winner = sequence[0][i];
      return winner;
    }
  }

  // Check for diagnoal wins (upper left to bottom right)
  if (sequence[0][0] === sequence[1][1] && sequence[1][1] === sequence[2][2]) {
    const winner = sequence[0][0];
    return winner;
  }

  // Check for diagnoal wins (upper right to bottom left)
  if (sequence[0][2] === sequence[1][1] && sequence[1][1] === sequence[2][0]) {
    const winner = sequence[0][2];
    return winner;
  }
};

localStorage.setItem("gameWith", "None");

// Ongoing Game
if (localStorage.getItem("gameWith") === "Player") {
  introBox.classList.add("hidden");
  topBar.classList.add("hidden");
  mainGame.classList.remove("hidden");
  introBox.innerHTML = "";
  topBar.innerHTML = "";
} else {
  gameBlocks.forEach((element) => (element.innerHTML = ""));
}

let currChance = "X";
let xLogoHtml = '<img src="images/icon-x.svg" alt="X Logo" class="logo-x">';
let xLogoHtml2 =
  '<img src="images/icon-x.svg" alt="Icon X" class="player-x-logo">';
let oLogoHtml = '<img src="images/icon-o.svg" alt="O Logo" class="logo-o">';
let oLogoHtml2 =
  '<img src="images/icon-o.svg" alt="Icon X" class="player-o-logo">';

gameBlocks.forEach((element) =>
  element.addEventListener("click", function () {
    if (element.innerHTML === "") {
      // Check whose chance it is
      if (localStorage.getItem("gameWith") === "Player")
        if (currChance === "X") {
          element.innerHTML = xLogoHtml;
          gameTurn.innerHTML = oLogoHtml2;
          currChance = "O";
        } else {
          element.innerHTML = oLogoHtml;
          gameTurn.innerHTML = xLogoHtml2;
          currChance = "X";
        }
      else if (localStorage.getItem("gameWith") === "CPU") {
        if (currChance === "X" && playerSelected === "X") {
          element.innerHTML = xLogoHtml;
          gameTurn.innerHTML = oLogoHtml;
          console.log("X Plays here");
          currChance = "O";
        } else if (currChance === "O" && playerSelected === "O") {
          element.innerHTML = oLogoHtml;
          gameTurn.innerHTML = xLogoHtml;
          currChance = "X";
        } else if (currChance === "X" && playerSelected === "O") {
          // CPU will play
        } else if (currChance === "O" && playerSelected === "X") {
          // CPU will play
        }

        // CPU will play now
        let finalRemainingBlocks = [];
        let remainingBlocks = gameBlocks.forEach((element) => {
          if (element.innerHTML === "") {
            finalRemainingBlocks.push(element);
          }
        });

        let randomBlock =
          finalRemainingBlocks[
            Math.trunc(Math.random() * finalRemainingBlocks.length)
          ];

        if (currChance === "O") {
          randomBlock.innerHTML = oLogoHtml;
          gameTurn.innerHTML = xLogoHtml;
          currChance = "X";
        } else if (currChance === "X") {
          randomBlock.innerHTML = xLogoHtml;
          gameTurn.innerHTML = oLogoHtml;
          currChance = "O";
        }

        console.log(currChance);
      }
    }
    const currSequence = getSequence();
    // Check for winner after each sequence
    let winner = checkWinners(currSequence);
    // Check for ties
    const isTie = Array.from(gameBlocks).every(
      (element) => element.innerHTML !== ""
    );

    if (isTie) {
      tieTeam.classList.remove("hidden");
      let tiescurrScore = Number(tiesGameScore.textContent);
      tiescurrScore += 1;
      tiesGameScore.textContent = tiescurrScore;
    } else if (winner === "X") {
      let xcurrScore = Number(xGameScore.textContent);
      xcurrScore += 1;
      xGameScore.textContent = xcurrScore;

      if (playerSelected === "X") {
        const popupPlayer = document.querySelector(
          ".winning-team__winner-text--player"
        );
        popupPlayer.textContent = "X";
        winningTeam.classList.remove("hidden");
      } else {
        const popupPlayer = document.querySelector(
          ".losing-team__winner-text--player"
        );
        popupPlayer.textContent = "X";
        losingTeam.classList.remove("hidden");
      }
    } else if (winner === "O") {
      let ycurrScore = Number(yGameScore.textContent);
      ycurrScore += 1;
      yGameScore.textContent = ycurrScore;
      if (playerSelected === "X") {
        const popupPlayer = document.querySelector(
          ".losing-team__winner-text--player"
        );
        popupPlayer.textContent = "O";
        losingTeam.classList.remove("hidden");
      } else {
        const winnerElementPopup = document.querySelector(
          ".winning-team__winner-text--player"
        );
        winnerElementPopup.textContent = "O";
        winningTeam.classList.remove("hidden");
      }
    }
  })
);

// Game with Player
newGameWithPlayer.addEventListener("click", function () {
  localStorage.setItem("gameWith", "Player");
  introBox.classList.add("hidden");
  topBar.classList.add("hidden");
  mainGame.classList.remove("hidden");
  // introBox.innerHTML = ''
  // topBar.innerHTML = ''
});

// Game with CPU
newGameWithCPU.addEventListener("click", function () {
  localStorage.setItem("gameWith", "CPU");
  introBox.classList.add("hidden");
  topBar.classList.add("hidden");
  mainGame.classList.remove("hidden");
});

quitBtn.forEach((element) =>
  element.addEventListener("click", function () {
    introBox.classList.remove("hidden");
    topBar.classList.remove("hidden");
    mainGame.classList.add("hidden");
    winningTeam.classList.add("hidden");
    losingTeam.classList.add("hidden");
    tieTeam.classList.add("hidden");
    gameBlocks.forEach((element) => (element.innerHTML = ""));
    xGameScore.textContent = 0;
    yGameScore.textContent = 0;
    tiesGameScore.textContent = 0;
    gameTurn.innerHTML = xLogoHtml2;
    currChance = "X";
  })
);

nextRoundBtn.forEach((element) =>
  element.addEventListener("click", function () {
    winningTeam.classList.add("hidden");
    losingTeam.classList.add("hidden");
    tieTeam.classList.add("hidden");
    gameBlocks.forEach((element) => (element.innerHTML = ""));
    gameTurn.innerHTML = xLogoHtml2;
    currChance = "X";
  })
);

restartBtn.addEventListener("click", function () {
  winningTeam.classList.add("hidden");
  losingTeam.classList.add("hidden");
  tieTeam.classList.add("hidden");
  gameBlocks.forEach((element) => (element.innerHTML = ""));
  gameTurn.innerHTML = xLogoHtml2;
  currChance = "X";
});
