const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Classe pour représenter un joueur de bowling
class Player {
  constructor(name) {
    this.name = name;
    this.frames = [];
  }

  addFrame(frame) {
    this.frames.push(frame);
  }

  getScore() {
    let score = 0;
    for (let i = 0; i < this.frames.length; i++) {
      score += this.frames[i].getScore();
    }
    return score;
  }
}

// Classe pour représenter un frame de bowling
class Frame {
  constructor() {
    this.rolls = [];
  }

  addRoll(pins) {
    this.rolls.push(pins);
  }

  getScore() {
    let score = 0;
    let rollIndex = 0;

    for (let frameIndex = 0; frameIndex < 10; frameIndex++) {
      const isStrike = this.rolls[rollIndex] === 10;
      const isSpare = this.rolls[rollIndex] + this.rolls[rollIndex + 1] === 10;

      score += this.rolls[rollIndex] + this.rolls[rollIndex + 1];

      if (isStrike) {
        score += this.rolls[rollIndex + 2];
        rollIndex++;
      } else if (isSpare) {
        score += this.rolls[rollIndex + 2];
        rollIndex += 2;
      } else {
        rollIndex += 2;
      }
    }

    return score;
  }
}

// Fonction pour démarrer une partie de bowling
function startBowlingGame() {
  rl.question('Démarrez une nouvelle partie de bowling.\nEntrez le nombre de joueurs: ', (numPlayers) => {
    const players = [];

    // Demander les noms des joueurs
    for (let i = 0; i < numPlayers; i++) {
      rl.question(`Entrez le nom du joueur ${i + 1}: `, (name) => {
        players.push(new Player(name));

        if (players.length === numPlayers) {
          playFrame(players, 1);
        }
      });
    }
  });
}

// Fonction pour jouer un frame
function playFrame(players, frameNumber) {
  if (frameNumber > 10) {
    endGame(players);
    return;
  }

  console.log(`Frame ${frameNumber}, lancer 1.`);

  for (let i = 0; i < players.length; i++) {
    rl.question(`${players[i].name}, combien de quilles avez-vous renversé ? `, (pins) => {
      const frame = new Frame();
      frame.addRoll(parseInt(pins));

      players[i].addFrame(frame);

      console.log(`Score après le frame ${frameNumber}:`);

      for (let j = 0; j < players.length; j++) {
        const score = players[j].getScore();
        console.log(`${players[j].name}: ${score} (en attente du prochain lancer pour le score final de ce frame)`);
      }

      playFrame(players, frameNumber + 1);
    });
  }
}

// Fonction pour terminer la partie et afficher les scores finaux
function endGame(players) {
  console.log('Score final:');

  let maxScore = 0;
  let winners = [];

  for (let i = 0; i < players.length; i++) {
    const score = players[i].getScore();
    console.log(`${players[i].name}: ${score}`);

    if (score > maxScore) {
      maxScore = score;
      winners = [players[i].name];
    } else if (score === maxScore) {
      winners.push(players[i].name);
    }
  }

  if (winners.length === 1) {
    console.log(`${winners[0]} est le/la gagnant(e) !`);
  } else {
    console.log(`Il y a une égalité entre les joueurs suivants: ${winners.join(', ')}`);
  }

  rl.close();
}

// Démarrer une nouvelle partie de bowling
startBowlingGame();