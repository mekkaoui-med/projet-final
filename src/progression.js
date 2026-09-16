const { apprenants } = require("./data");

function normaliserNom(nom) {
  let nomNormalise = nom.trim().toLowerCase();
  let nomVerification = /^[a-z ]+$/;
  if (nomVerification.test(nomNormalise)) {
    return nomNormalise;
  } else {
  }
}

module.exports = {
  normaliserNom,
};
