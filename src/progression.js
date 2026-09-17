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
  if (nomValid === true) {
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

function rechercherApprenant(idOrnom) {
  for (let i = 0; i < apprenants.length; i++) {
    //found by id
    if (/^\d+$/.test(idOrnom)) {
      if (apprenants[i].id == idOrnom) {
        return apprenants[i];
      }
    } else {
      // found by name
      if (
        apprenants[i].nomComplet.toLocaleLowerCase() ==
        idOrnom.toLocaleLowerCase()
      ) {
        return apprenants[i];
      }
    }
  }
  return false;
}
function enregistrerResultat(
  id,
  jour,
  exercicesTermines,
  totalExercices,
  challengeTermine,
) {
  let apprenant = rechercherApprenant(id);
  if (apprenant === false) {
    return false;
  }
  let validResult = validerResultat(
    jour,
    exercicesTermines,
    totalExercices,
    challengeTermine,
  );
  if (validResult === false) {
    return false;
  }
  let jourExiste = false;
  for (let i = 0; i < apprenant.resultats.length; i++) {
    if (apprenant.resultats[i].jour == jour) {
      apprenant.resultats[i].exercicesTermines = exercicesTermines;
      apprenant.resultats[i].totalExercices = totalExercices;
      apprenant.resultats[i].challengeTermine = challengeTermine;
      jourExiste = true;
    }
  }
  if (jourExiste == false) {
    let nouveauResultat = {
      jour: jour,
      exercicesTermines: exercicesTermines,
      totalExercices: totalExercices,
      challengeTermine: challengeTermine,
    };
    apprenant.resultats.push(nouveauResultat);
  }
  return true;
}

function calculerProgression(apprenant) {
  let exercicesTermines = 0;
  let exercicesProposes = 0;
  let challengesTermine = 0;
  let journeeRenseignees = 0;

  for (let i = 0; i < apprenant.resultats.length; i++) {
    exercicesTermines =
      exercicesTermines + apprenant.resultats[i].exercicesTermines;
    exercicesProposes =
      exercicesProposes + apprenant.resultats[i].totalExercices;
    if (apprenant.resultats[i].challengeTermine) {
      challengesTermine++;
    }
    journeeRenseignees++;
  }
  let progression;
  if (exercicesProposes === 0) {
    progression = 0;
  } else {
    progression = (exercicesTermines / exercicesProposes) * 100;
  }
  return {
    exercicesTermines: exercicesTermines,
    exercicesProposes: exercicesProposes,
    challengesTermine: challengesTermine,
    progression: progression,
    journeeRenseignees: journeeRenseignees,
  };
}

function filtrerParNiveau(apprenants, niveau) {
  let resulat = [];
  for (let i = 0; i < apprenants.length; i++) {
    let indicature = calculerProgression(apprenants[i]);
    let progression = indicature.progression;
    let niveauCalculer;
    if (progression >= 80) {
      niveauCalculer = "Solide";
    } else if (progression >= 50) {
      niveauCalculer = "En progression";
    } else {
      niveauCalculer = "A renforcer";
    }
    if (niveau === niveauCalculer) {
      resulat.push(apprenants[i]);
    }
  }
  return resulat;
}

module.exports = {
  normaliserNom,
  validerResultat,
  ajouterApprenant,
  rechercherApprenant,
  enregistrerResultat,
  calculerProgression,
  filtrerParNiveau,
};
