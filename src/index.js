const readline = require("readline");

const {
  afficherTableauDeBord,
  ajouterApprenant,
  rechercherApprenant,
  enregistrerResultat,
  filtrerParNiveau,
  trierParProgression,
} = require("./progression");

const { apprenants } = require("./data");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(`
=================================
       SAS PROGRESS CONSOLE
=================================

1. Afficher le tableau de bord
2. Afficher la liste des apprenants
3. Ajouter un apprenant
4. Consulter un apprenant par identifiant
5. Ajouter ou modifier le résultat d'une journée
6. Rechercher un apprenant par nom
7. Filtrer les apprenants par niveau
8. Trier les apprenants par progression décroissante
9. Trier les apprenants par ordre alphabétique
0. Quitter
`);

rl.question("Choisissez une option : ", (choix) => {
  switch (choix) {
    case "1":
      afficherTableauDeBord();
      rl.close();
      break;

    case "2":
      console.dir(apprenants, { depth: null });
      rl.close();
      break;

    case "3":
      rl.question("Identifiant : ", (id) => {
        rl.question("Nom complet : ", (nomComplet) => {
          rl.question("Ville : ", (ville) => {
            let resultat = ajouterApprenant(id, nomComplet, ville);

            if (resultat === true) {
              console.log("Apprenant ajouté avec succès." )
            } else {
              console.log("Impossible d'ajouter l'apprenant, car le id elle deja existe");
            }

            rl.close();
          });
        });
      });
      break;

    case "4":
      rl.question("Identifiant : ", (id) => {
        let apprenant = rechercherApprenant(id);

        if (apprenant === false) {
          console.log("Apprenant introuvable.");
        } else {
          console.dir(apprenant, { depth: null });
        }

        rl.close();
      });
      break;

    case "5":
      rl.question("Identifiant : ", (id) => {
        rl.question("Jour : ", (jour) => {
          rl.question("Exercices terminés : ", (exercicesTermines) => {
            rl.question("Total exercices : ", (totalExercices) => {
              rl.question(
                "Challenge terminé (true/false) : ",
                (challengeTermine) => {
                  let resultat = enregistrerResultat(
                    id,
                    jour,
                    exercicesTermines,
                    totalExercices,
                    challengeTermine === "true",
                  );

                  if (resultat === true) {
                    console.log("Résultat enregistré avec succès.");
                  } else {
                    console.log("Impossible d'enregistrer le résultat.");
                  }

                  rl.close();
                },
              );
            });
          });
        });
      });
      break;

    case "6":
      rl.question("Nom de l'apprenant : ", (nom) => {
        let apprenant = rechercherApprenant(nom);

        if (apprenant === false) {
          console.log("Apprenant introuvable.");
        } else {
          console.dir(apprenant, { depth: null });
        }

        rl.close();
      });
      break;

    case "7":
      rl.question(
        "Niveau (Solide / En progression / À renforcer) : ",
        (niveau) => {
          let resultat = filtrerParNiveau(niveau);

          if (resultat.length === 0) {
            console.log("Aucun apprenant trouvé.");
          } else {
            console.dir(resultat, { depth: null });
          }

          rl.close();
        },
      );
      break;

    case "8":
      let resultatProgression = trierParProgression();

      console.dir(resultatProgression, { depth: null });

      rl.close();
      break;

    case "9":
      let apprenantsAlphabete = [...apprenants];

      apprenantsAlphabete.sort(function (a, b) {
        return a.nomComplet.localeCompare(b.nomComplet);
      });

      console.dir(apprenantsAlphabete, { depth: null });

      rl.close();
      break;

    case "0":
      console.log("Au revoir !");
      rl.close();
      break;

    default:
      console.log("Option invalide.");
      rl.close();
  }
});
