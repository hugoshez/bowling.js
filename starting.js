const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Entrez le nombre de joueurs (entre 1 et 6) : ', (nombreJoueurs) => {
  // Faites quelque chose avec la valeur saisie par l'utilisateur
  console.log('Le nombre de joueurs est :', nombreJoueurs);

  rl.close();
});
