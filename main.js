import { createInterface } from 'readline';

class Player {
  constructor(name) {
    this.name = name;
    this.frames = [];
  }

  addFrame(frame) {
    this.frames.push(frame);
  }

  calculateScore() {
    let score = 0;
    let frameIndex = 0;

    for (let frame = 0; frame < 10; frame++) {
      const currentFrame = this.frames[frameIndex];

      if (isStrike(currentFrame)) {
        score += 10 + getStrikeBonus(frameIndex);
        frameIndex += 1;
      } else if (isSpare(currentFrame)) {
        score += 10 + getSpareBonus(frameIndex);
        frameIndex += 2;
      } else {
        score += getFrameScore(frameIndex);
        frameIndex += 2;
      }
    }

    return score;
  }
}

function isStrike(frame) {
  return frame[0] === 10;
}

function isSpare(frame) {
  return frame[0] + frame[1] === 10;
}

function getStrikeBonus(frameIndex) {
  return players.reduce((bonus, player) => {
    const nextFrame = player.frames[frameIndex + 1];
    const secondNextFrame = player.frames[frameIndex + 2];
    return bonus + nextFrame[0] + (nextFrame[1] || secondNextFrame[0]);
  }, 0);
}

function getSpareBonus(frameIndex) {
  return players.reduce((bonus, player) => {
    const nextFrame = player.frames[frameIndex + 1];
    return bonus + nextFrame[0];
  }, 0);
}

function getFrameScore(frameIndex) {
  return players.reduce((frameScore, player) => {
    const frame = player.frames[frameIndex];
    return frameScore + frame[0] + frame[1];
  }, 0);
}

function startGame() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Enter the number of players (between 1 and 6): ", (numPlayers) => {
    if (numPlayers < 1 || numPlayers > 6) {
      console.log("Invalid number of players!");
      rl.close();
      return;
    }

    players = [];
    getPlayerNames(rl, numPlayers, 1);
  });
}

function getPlayerNames(rl, numPlayers, currentPlayer) {
  if (currentPlayer <= numPlayers) {
    rl.question(`Enter the name of player ${currentPlayer}: `, (name) => {
      players.push(new Player(name));
      getPlayerNames(rl, numPlayers, currentPlayer + 1);
    });
  } else {
    rl.close();
    playFrames();
  }
}

function playFrames() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let currentPlayerIndex = 0;
  let currentFrameIndex = 0;

  function playFrame() {
    if (currentFrameIndex >= 10) {
      rl.close();
      displayResults();
      return;
    }

    const currentPlayer = players[currentPlayerIndex];

    rl.question(`Enter the number of knocked pins for ${currentPlayer.name} in frame ${currentFrameIndex + 1}: `, (input) => {
      const knockedPins = parseInt(input, 10);

      if (isNaN(knockedPins) || knockedPins < 0 || knockedPins > 10) {
        console.log("Invalid input! Please enter a number between 0 and 10.");
        playFrame();
        return;
      }

      const frameScore = [knockedPins];

      if (knockedPins === 10) { // Strike
        currentPlayer.addFrame(frameScore);
        currentFrameIndex++;
      } else {
        rl.question(`Enter the number of knocked pins for ${currentPlayer.name} in the second roll of frame ${currentFrameIndex + 1}: `, (input) => {
          const secondRollPins = parseInt(input, 10);

          if (isNaN(secondRollPins) || secondRollPins < 0 || (knockedPins + secondRollPins) > 10) {
            console.log("Invalid input! Please enter a number between 0 and " + (10 - knockedPins) + ".");
            playFrame();
            return;
          }

          frameScore.push(secondRollPins);
          currentPlayer.addFrame(frameScore);
          currentFrameIndex++;
        });
      }

      currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
      playFrame();
    });
  }

  playFrame();
}

function displayResults() {
  players.forEach(player => {
    const score = player.calculateScore();
    console.log(`${player.name}: ${score} points`);
  });

  const winners = getWinners();
  if (winners.length === 1) {
    console.log(`The winner is ${winners[0].name}!`);
  } else {
    console.log("It's a tie! The winners are:");
    winners.forEach(winner => console.log(winner.name));
  }
}

function getWinners() {
  const maxScore = Math.max(...players.map(player => player.calculateScore()));
  return players.filter(player => player.calculateScore() === maxScore);
}

let players = [];
startGame();
