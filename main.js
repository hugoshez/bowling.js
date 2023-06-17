const readlineSync = require("readline-sync");

class Player {
  constructor(name) {
    this.name = name;
    this.scores = [];
  }

  addScore(score) {
    this.scores.push(score);
  }

  getTotalScore() {
    return this.scores.reduce((total, score) => total + score, 0);
  }
}

class BowlingGame {
  constructor() {
    this.players = [];
    this.currentFrame = 1;
  }

  addPlayer(name) {
    if (this.players.length >= 6) {
      console.log("Le nombre maximum de joueurs est atteint.");
      return;
    }
    const player = new Player(name);
    this.players.push(player);
  }

  playFrame() {
    console.log(`Frame ${this.currentFrame}:`);
    for (const player of this.players) {
      const score1 = parseInt(readlineSync.question(`Score du premier lancer pour ${player.name}: `));
      if (score1 === 10) {
        console.log("STRIKE DANS LES TOURS JUMELLES !!!")
        player.addScore(score1);
        continue;
      }
      const score2 = parseInt(readlineSync.question(`Score du deuxieme lancer pour ${player.name}: `));
      if (score1 + score2 === 10) {
        console.log("SPARE SA MERE")
        player.addScore(score1);
      }
      player.addScore(score1 + score2);
    }
  }

  playGame() {
    const numPlayers = parseInt(readlineSync.question("Nombre de joueurs (1-6): "));
    for (let i = 0; i < numPlayers; i++) {
      const name = readlineSync.question(`Nom du joueur ${i + 1}: `);
      this.addPlayer(name);
    }

    while (this.currentFrame <= 10) {
      this.playFrame();
      this.currentFrame++;
    }

    this.displayScores();
  }

  displayScores() {
    console.log("\nRésultats finaux:");
    let maxScore = 0;
    let winners = [];

    for (const player of this.players) {
      const totalScore = player.getTotalScore();
      console.log(`${player.name}: ${totalScore}`);
      if (totalScore > maxScore) {
        maxScore = totalScore;
        winners = [player.name];
      } else if (totalScore === maxScore) {
        winners.push(player.name);
      }
    }

    if (winners.length === 1) {
      console.log(`\nLe gagnant est ${winners[0]}!`);
    } else {
      console.log("\nÉgalité! Les gagnants sont:");
      for (const winner of winners) {
        console.log(winner);
      }
    }
  }
}

const game = new BowlingGame();
game.playGame();
