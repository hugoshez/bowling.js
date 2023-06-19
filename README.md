# bowling.js

Le but de ce projet est de mettre en place un bowling jouable dans le terminal en JavaScript.
Le joueur devra choisir le nombre de participants (1 à 6),
le nom des joueurs,
et la partie va commencer,
voici un exemple de partie :


Démarrez une nouvelle partie de bowling
Entrez le nombre de joueurs: 2
Entrez le nom du joueur 1: Théau
Entrez le nom du joueur 2: Hugo
Frame 1, lancer 1.
Théau, combien de quilles avez-vous renversé ? 7
         lancer 2.
Théau, combien de quilles avez-vous renversé ? 3 (Spare)

Frame 1, lancer 1.
Hugo, combien de quilles avez-vous renversé ? 6
         lancer 2.
Hugo, combien de quilles avez-vous renversé ? 2

Score après le frame 1:
Théau: 10 (en attente du prochain lancer pour le score final de ce frame)
Hugo: 8
...
Frame 10, lancer 2.
Théau, combien de quilles avez-vous renversé ? 2
Hugo, combien de quilles avez-vous renversé ? 3
Score final:
Théau: 123
Hugo: 117
Théau est le gagnant !!!

La partie est maintenant terminée.
lorsqu'un joueur fait un spare,
il gagne 5 points sur le lancer d'après,
et s'il fait un strike,
il gagne alors 10 points sur le lancer d'après.
Le joueur pourra ensuite avoir l'historique des scores.