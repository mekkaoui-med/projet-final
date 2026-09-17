const { apprenants } = require("./data");

function normaliserNom(nom) {
  let nomNormalise = nom.trim().toLowerCase();
  let nomVerification = /^[a-z ]+$/;
  if (nomVerification.test(nomNormalise)) {
    return nomNormalise;
  } else {
    return null;
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

module.exports = {
  normaliserNom,
  validerResultat,
};
