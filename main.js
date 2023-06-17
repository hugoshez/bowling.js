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
      let validScore = false;
      while (!validScore) {
        const score1 = parseInt(readlineSync.question(`Score du premier lancer pour ${player.name}: `));
        if (score1 > 10) {
          console.log("Erreur : Le nombre de quilles renversées ne peut pas dépasser 10.");
          continue;
        }
        player.addScore(score1);
        validScore = true;

        if (score1 === 10) {
          console.log("Strike dans les tours jumelles!");
          break;
        }

        let score2;
        while (true) {
          score2 = parseInt(readlineSync.question(`Score du deuxième lancer pour ${player.name}: `));
          if (score1 + score2 > 10) {
            console.log("Erreur : Le nombre total de quilles renversées ne peut pas dépasser 10.");
            continue;
          }
          break;
        }
        player.addScore(score2);

        if (score1 + score2 === 10) {
          console.log("Spare sa mere!");
        }
      }
    }
  }

  playGame() {
    let numPlayers = 0;
    while (numPlayers < 1 || numPlayers > 6) {
      numPlayers = parseInt(readlineSync.question("Nombre de joueurs (1-6): "));
      if (numPlayers < 1 || numPlayers > 6) {
        console.log("Veuillez entrer un nombre de joueurs valide (entre 1 et 6).");
      }
    }

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
