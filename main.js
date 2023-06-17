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

  validateName(name) {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(name);
  }

  playFrame() {
    console.log(`Frame ${this.currentFrame}:`);
    for (const player of this.players) {
      let validName = false;
      let playerName;
      while (!validName) {
        playerName = readlineSync.question(`Nom du joueur: `);
        if (!this.validateName(playerName)) {
          console.log("Erreur : Le nom du joueur doit comporter au moins un caractère alphanumérique.");
        } else {
          validName = true;
          player.name = playerName;
        }
      }

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
          console.log("Strike !");
          if (this.currentFrame === 10) {
            const extraScore1 = parseInt(readlineSync.question(`Score du premier lancer supplémentaire pour ${player.name}: `));
            player.addScore(extraScore1);
            if (extraScore1 === 10) {
              console.log("Strike supplémentaire !");
              const extraScore2 = parseInt(readlineSync.question(`Score du deuxième lancer supplémentaire pour ${player.name}: `));
              player.addScore(extraScore2);
            }
          }
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
          console.log("Spare !");
          if (this.currentFrame === 10) {
            const extraScore = parseInt(readlineSync.question(`Score du lancer supplémentaire pour ${player.name}: `));
            player.addScore(extraScore);
          }
        }
      }
    }
  }

  playGame() {
    let numPlayers = NaN;
    while (isNaN(numPlayers) || numPlayers < 1 || numPlayers > 6) {
      numPlayers = parseInt(readlineSync.question("Nombre de joueurs (1-6): "));
      if (isNaN(numPlayers) || numPlayers < 1 || numPlayers > 6) {
        console.log("Veuillez entrer un nombre de joueurs valide (entre 1 et 6).");
      }
    }

    for (let i = 0; i < numPlayers; i++) {
      let validName = false;
      let playerName;
      while (!validName) {
        playerName = readlineSync.question(`Nom du joueur ${i + 1}: `);
        if (!this.validateName(playerName)) {
          console.log("Erreur : Le nom du joueur doit comporter au moins un caractère alphanumérique.");
        } else {
          validName = true;
          this.addPlayer(playerName);
        }
      }
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
      console.log(`\nLe gagnant est ${winners[0]} !`);
    } else {
      console.log("\nÉgalité! Les gagnants sont:");
      for (const winner of winners) {
        console.log(winner);
      }
    }

    if (maxScore === 300) {
      console.log("\nFélicitations ! Vous avez atteint le score parfait de 300 points !");
    }
  }
}

const game = new BowlingGame();
game.playGame();
