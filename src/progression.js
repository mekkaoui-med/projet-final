const { apprenants } = require("./data");

function normaliserNom(nom) {
  //fati el dsouli!
  let nomNormalise = nom.trim().toLowerCase();
  let nomVerification = /^[a-z ]+$/;
  if (nomVerification.test(nomNormalise)) {
    return nomNormalise;
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
  if (nomValid === false) {
    return false;
  }
  const apprenant = {
    id: id,
    nomComplet: nomValid,
    ville: ville,
    resultats: [],
  };
  apprenants.push(apprenant);
  return true;
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
        apprenants[i].nomComplet
          .toLocaleLowerCase()
          .includes(idOrnom.toLocaleLowerCase())
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
  jour = Number(jour);
  exercicesTermines = Number(exercicesTermines);
  totalExercices = Number(totalExercices);

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
      break;
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
    if (apprenant.resultats[i].challengeTermine == true) {
      //cuz challaengeTermine is boolien
      challengesTermine++;
    }
    journeeRenseignees++;
  }
  let progression = 0;
  if (exercicesProposes > 0) {
    progression = (exercicesTermines / exercicesProposes) * 100; // 89.98
    progression = Number(progression.toFixed(2));
  }
  return {
    exercicesTermines: exercicesTermines,
    exercicesProposes: exercicesProposes,
    challengesTermine: challengesTermine,
    progression: progression,
    journeeRenseignees: journeeRenseignees,
  };
}
function filtrerParNiveau(niveau) {
  let resultat = [];
  for (let i = 0; i < apprenants.length; i++) {
    let indicatureDeProgression = calculerProgression(apprenants[i]);
    let progression = indicatureDeProgression.progression;
    let niveauCalculer = "";
    if (progression >= 80) {
      niveauCalculer = "Solide";
    } else if (progression >= 50) {
      niveauCalculer = "En Progression";
    } else {
      niveauCalculer = "A Renforcer";
    }
    if (niveauCalculer === niveau) {
      resultat.push(apprenants[i]);
    }
  }
  return resultat;
}

function trierParProgression() {
  let apprenantsData = [...apprenants];
  apprenantsData.sort(function (i, j) {
    let indicature1 = calculerProgression(i);
    let indicature2 = calculerProgression(j);

    let progression1 = indicature1.progression;
    let progression2 = indicature2.progression;
    return progression2 - progression1;
  });
  return apprenantsData;
}

function afficherTableauDeBord() {
  let totalApprenants = apprenants.length;
  let sommeProgression = 0;

  for (let i = 0; i < apprenants.length; i++) {
    let indicature = calculerProgression(apprenants[i]);
    sommeProgression += indicature.progression;
  }

  let progressionMoyene = 0;

  if (apprenants.length != 0) {
    progressionMoyene = sommeProgression / apprenants.length;
    progressionMoyene = Number(progressionMoyene.toFixed(2));
  }

  let Solide = filtrerParNiveau("Solide").length;
  let EnProgression = filtrerParNiveau("En Progression").length;
  let aRononforce = filtrerParNiveau("A Renforcer").length;

  console.log("=================================");
  console.log("       TABLEAU DE BORD");
  console.log("=================================");
  console.log("Total apprenants :", totalApprenants);
  console.log("Progression moyenne :", progressionMoyene + "%");
  console.log("Solide :", Solide);
  console.log("En progression :", EnProgression);
  console.log("À renforcer :", aRononforce);
  console.log("=================================");

  let apprenantsTries = trierParProgression();

  for (let i = 0; i < apprenantsTries.length; i++) {
    let indicature = calculerProgression(apprenantsTries[i]);

    console.log(
      "-" + apprenantsTries[i].nomComplet + ":",
      indicature.progression + "%",
    );

    for (let jour = 1; jour <= 7; jour++) {
      let resulatJour = false;

      for (let j = 0; j < apprenantsTries[i].resultats.length; j++) {
        if (apprenantsTries[i].resultats[j].jour === jour) {
          resulatJour = apprenantsTries[i].resultats[j];
        }
        break;
      }

      if (resulatJour === false) {
        console.log("Jour " + jour + " : non renseigné");
      } else if (resulatJour.challengeTermine === false) {
        console.log("Jour " + jour + " : challenge non terminé");
      }
    }
  }
}

module.exports = {
  normaliserNom,
  validerResultat,
  ajouterApprenant,
  rechercherApprenant,
  enregistrerResultat,
  calculerProgression,
  filtrerParNiveau,
  trierParProgression,
  afficherTableauDeBord,
};
