const { apprenants } = require("./data");

function normaliserNom(nom) {
  let nomNormalise = nom.trim().toLowerCase();
  let nomVerification = /^[a-z ]+$/;
  if (nomVerification.test(nomNormalise)) {
    return true;
  } else {
    return false;
  }
}

function validerResultat(
  jour,
  exercicesTermines,
  totalExercices,
  challengeTermine,
) {
  if (jour < 1 || jour > 7) {
    return false;
  }

  if (exercicesTermines < 0) {
    return false;
  }

  if (totalExercices <= 0) {
    return false;
  }

  if (exercicesTermines > totalExercices) {
    return false;
  }

  if (challengeTermine !== true && challengeTermine !== false) {
    return false;
  }

  return true;
}

function ajouterApprenant(id, nomComplet, ville) {
  for (let i = 0; i < apprenants.length; i++) {
    if (apprenants[i].id == id) {
      return false;
    }
  }
  let nomValid = normaliserNom(nomComplet);
  if(nomValid === true){

  
  const apprenant = {
    id: id,
    nomComplet: nomComplet,
    ville: ville,
    resultats: [],
  };
  apprenants.push(apprenant);
  return true;
  }
  return false;
}

module.exports = {
  normaliserNom,
  validerResultat,
  ajouterApprenant,
};
