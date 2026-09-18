const readline = require("readline");

const {
  afficherTableauDeBord,
  ajouterApprenant,
  rechercherApprenant,
  enregistrerResultat,
  filtrerParNiveau,
  trierParProgression,
  afficherApprenant,
  afficherListeApprenants,
} = require("./progression");

const { apprenants } = require("./data");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function afficherMenu() {
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
}

function continuerOuQuitter() {
  rl.question(
    "\nVoulez-vous revenir au menu ? (1 = Oui / 0 = Quitter) : ",
    (choix) => {
      if (choix === "1") {
        demanderChoix();
      } else if (choix === "0") {
        console.log("Au revoir !");
        rl.close();
      } else {
        console.log("Option invalide. Veuillez choisir 1 ou 0.");
        continuerOuQuitter();
      }
    },
  );
}

function demanderChoix() {
  afficherMenu();

  rl.question("Choisissez une option : ", (choix) => {
    console.log("Votre choix :", choix);

    switch (choix) {
      case "1":
        afficherTableauDeBord();

        continuerOuQuitter();
        break;

      case "2":
        afficherListeApprenants(apprenants);

        continuerOuQuitter();
        break;

      case "3":
        rl.question("Identifiant : ", (id) => {
          rl.question("Nom complet : ", (nomComplet) => {
            rl.question("Ville : ", (ville) => {
              let resultat = ajouterApprenant(id, nomComplet, ville);

              if (resultat === true) {
                console.log("Apprenant ajouté avec succès.");
              } else {
                console.log(resultat);
              }

              continuerOuQuitter();
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
            afficherApprenant(apprenant);
          }

          continuerOuQuitter();
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
                      console.log(
                        "Impossible d'enregistrer le résultat.",
                      );
                    }

                    continuerOuQuitter();
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
            afficherApprenant(apprenant);
          }

          continuerOuQuitter();
        });
        break;

      case "7":
        rl.question(
          "Niveau (Solide / En Progression / A renforcer) : ",
          (niveau) => {
            let resultat = filtrerParNiveau(niveau);

            if (resultat.length === 0) {
              console.log("Aucun apprenant trouvé.");
            } else {
              afficherListeApprenants(resultat);
            }

            continuerOuQuitter();
          },
        );
        break;

      case "8":
        let resultatProgression = trierParProgression();

        afficherListeApprenants(resultatProgression);

       continuerOuQuitter();
        break;

      case "9":
        let apprenantsAlphabete = [...apprenants];

        apprenantsAlphabete.sort(function (a, b) {
          return a.nomComplet.localeCompare(b.nomComplet);
        });

        afficherListeApprenants(apprenantsAlphabete);

       continuerOuQuitter();
        break;

      case "0":
        console.log("Au revoir !");
        rl.close();
        break;

      default:
        console.log("Option invalide.");

        demanderChoix();
    }
  });
}

demanderChoix();