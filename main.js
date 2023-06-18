// Importation du module readline-sync pour permettre la saisie utilisateur
const readlineSync = require("readline-sync");

// Classe représentant un joueur
class Player {
  constructor(name) {
    this.name = name; // Nom du joueur
    this.scores = []; // Tableau pour stocker les scores
  }

  // Méthode pour ajouter un score
  addScore(score) {
    this.scores.push(score);
  }

  // Méthode pour calculer le score total
  getTotalScore() {
    return this.scores.reduce((total, score) => total + score, 0);
  }
}

// Classe principale du jeu de bowling
class BowlingGame {
  constructor() {
    this.players = []; // Tableau pour stocker les joueurs
    this.currentFrame = 1; // Numéro du frame en cours
  }

  // Méthode pour ajouter un joueur
  addPlayer(name) {
    if (this.players.length >= 6) {
      console.log("Le nombre maximum de joueurs est atteint.");
      return;
    }
    const player = new Player(name);
    this.players.push(player);
  }

  // Méthode pour valider le nom du joueur
  validateName(name) {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(name);
  }

  // Méthode pour jouer un frame
  playFrame() {
    console.log(`Frame ${this.currentFrame}:`);
    for (const player of this.players) {
      console.log(`Tour du joueur ${player.name}`);

      // Saisie du score du premier lancer
      let score1 = parseInt(readlineSync.question("Score du premier lancer: "));
      while (isNaN(score1) || score1 < 0 || score1 > 10) {
        console.log("Veuillez entrer un nombre entre 0 et 10.");
        score1 = parseInt(readlineSync.question("Score du premier lancer: "));
      }
      player.addScore(score1);

      // Vérification d'un strike
      if (score1 === 10) {
        console.log("Strike !");
        player.addScore(10); // Ajoute 10 points pour le strike
      } else {
        // Saisie du score du deuxième lancer
        let score2 = parseInt(readlineSync.question("Score du deuxième lancer: "));
        while (isNaN(score2) || score2 < 0 || score2 > 10 || score1 + score2 > 10) {
          console.log("Veuillez entrer un nombre entre 0 et 10.");
          score2 = parseInt(readlineSync.question("Score du deuxième lancer: "));
        }
        player.addScore(score2);

        // Vérification d'un spare
        if (score1 + score2 === 10) {
          console.log("Spare !");
          player.addScore(10); // Ajoute 10 points pour le spare
        }
      }
    }
  }

  // Méthode pour jouer une partie complète
  playGame() {
    let numPlayers = NaN;
    while (isNaN(numPlayers) || numPlayers < 1 || numPlayers > 6) {
      numPlayers = parseInt(readlineSync.question("Nombre de joueurs (1-6): "));
      if (isNaN(numPlayers) || numPlayers < 1 || numPlayers > 6) {
        console.log("Veuillez entrer un nombre valide de joueurs (entre 1 et 6).");
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
      console.log();
      this.playFrame();

      // Vérification du dixième frame
      if (this.currentFrame === 10) {
        for (const player of this.players) {
          // Si le joueur a fait un spare ou un strike, il a droit à un ou deux lancers supplémentaires, respectivement
          if (player.scores[player.scores.length - 1] === 10 || player.scores[player.scores.length - 2] === 10) {
            console.log(`Lancers supplémentaires pour le joueur ${player.name}:`);

            // Saisie du score du premier lancer supplémentaire
            let extraScore1 = parseInt(readlineSync.question("Score du premier lancer supplementaire: "));
            while (isNaN(extraScore1) || extraScore1 < 0 || extraScore1 > 10) {
              console.log("Veuillez entrer un nombre entre 0 et 10.");
              extraScore1 = parseInt(readlineSync.question("Score du premier lancer supplementaire: "));
            }
            player.addScore(extraScore1);

            // Vérification d'un strike au premier lancer supplémentaire
            if (extraScore1 != 10) {
              player.addScore(extraScore1); 
            } else {
              console.log("Strike !");
              // Saisie du score du deuxième lancer supplémentaire
              let extraScore2 = parseInt(readlineSync.question("Score du deuxieme lancer supplementaire: "));
              while (isNaN(extraScore2) || extraScore2 < 0 || extraScore2 > 10) {
                console.log("Veuillez entrer un nombre entre 0 et 10.");
                extraScore2 = parseInt(readlineSync.question("Score du deuxieme lancer supplementaire: "));
              }
              player.addScore(extraScore2);
            }
          }
        }
      }

      this.currentFrame++;
    }

    this.displayScores();
  }

  // Méthode pour afficher les scores finaux et le gagnant
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
  }
}

// Création d'une instance du jeu et démarrage de la partie
const game = new BowlingGame();
game.playGame();
