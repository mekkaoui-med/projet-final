const { apprenants } = require("../src/data");

const {
  validerResultat,
  normaliserNom,
  ajouterApprenant,
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


console.log("Avant :");
console.log(apprenants);

console.log("Test 1 - nom valide :");

let resultat1 = ajouterApprenant(4, "Mohamed Mekkaoui", "Nador");

console.log(resultat1);

console.log("Après le premier test :");
console.log(apprenants);

console.log("Test 2 - ID déjà existant :");

let resultat2 = ajouterApprenant(2, "Ahmed Test", "Oujda");

console.log(resultat2);

console.log("Après le deuxième test :");
console.log(apprenants);

console.log("Test 3 - nom invalide :");

let resultat3 = ajouterApprenant(5, "Ahmed123", "Nador");

console.log(resultat3);

console.log("Après le troisième test :");
console.log(apprenants);
