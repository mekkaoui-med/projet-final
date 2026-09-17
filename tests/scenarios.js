const { apprenants } = require("../src/data");

const {
  validerResultat,
  normaliserNom,
  ajouterApprenant,
  rechercherApprenant,
  enregistrerResultat,
  calculerProgression,
  filtrerParNiveau,
} = require("../src/progression");

// console.log(validerResultat(1, 18, 20, true));
// console.log(validerResultat(8, 18, 20, true));
// console.log(validerResultat(3, 25, 20, true));
// console.log(validerResultat(4, 10, 20, false));
// console.log(normaliserNom("Mekkaoui Moh ameD"));

// console.log("Test avec un nouvel ID :");

// console.log(ajouterApprenant(4, "Mohamed Mekkaoui      ", "Nador"));

// console.log(apprenants);

// console.log("Test avec un ID déjà existant :");

// console.log(ajouterApprenant(2, "Ahmed Test", "Oujda"));

// console.log(apprenants);

// test ajouteerApprenant
// console.log("Avant :");
// console.log(apprenants);

// console.log("Test 1 - nom valide :");

// let resultat1 = ajouterApprenant(4, "Mohamed Mekkaoui", "Nador");

// console.log(resultat1);

// console.log("Après le premier test :");
// console.log(apprenants);

// console.log("Test 2 - ID déjà existant :");

// let resultat2 = ajouterApprenant(2, "Ahmed Test", "Oujda");

// console.log(resultat2);

// console.log("Après le deuxième test :");
// console.log(apprenants);

// console.log("Test 3 - nom invalide :");

// let resultat3 = ajouterApprenant(5, "Ahmed123", "Nador");

// console.log(resultat3);

// console.log("Après le troisième test :");
// console.log(apprenants);

// // Test 1: search by existing ID
// console.log("Test 1 - ID existant :");
// console.log(rechercherApprenant("3"));

// // Test 2: search by non-existing ID
// console.log("Test 2 - ID inexistant :");
// console.log(rechercherApprenant("10"));

// // Test 3: search by existing name
// console.log("Test 3 - Nom existant :");
// console.log(rechercherApprenant("Sara Dev"));

// // Test 4: search by non-existing name
// console.log("Test 4 - Nom inexistant :");
// console.log(rechercherApprenant("Mohamed Test"));
// console.log("AVANT :");
// console.log(apprenants[0]);

// console.log("\n--- Test 1 : modifier le jour 1 ---");

// let resultat1 = enregistrerResultat(
//   1, // ID de Sara
//   4, // jour existant
//   19, // exercices terminés
//   20, // total exercices
//   false, // challenge
// );

// console.log("Résultat :", resultat1);

// console.log("APRÈS :");
// console.log(apprenants[0]);

// let progression = calculerProgression(apprenants[0]);

// console.log(progression);
console.log(filtrerParNiveau(apprenants,"En progression"))
console.log(filtrerParNiveau(apprenants,"Solide"))
console.log(filtrerParNiveau(apprenants,"A renforcer"))