# SAS Progress (projet-final)

Petit utilitaire Node.js pour suivre la progression d'apprenants sur une semaine.

## Description

Ce projet contient une petite application console (CLI) qui permet :

- d'afficher un tableau de bord des apprenants,
- d'ajouter et rechercher des apprenants,
- d'enregistrer les résultats journaliers (exercices terminés / total, challenge terminé),
- de filtrer et trier les apprenants selon leur progression.

Le code est écrit en JavaScript sans dépendances externes (Node.js standard).

## Structure du projet

- `src/data.js` : jeu de données initial (liste d'apprenants et leurs résultats).
- `src/progression.js` : logique métier (normalisation, validation, calculs, filtrage, tri, affichage du tableau de bord).
- `src/index.js` : interface console interactive (menu) pour utiliser les fonctions.
- `tests/scenarios.js` : script de scénarios/tests manuels commentés et appel à `afficherTableauDeBord()`.

## Installation

Prérequis : Node.js (version 12+(v24.19.0) recommandée).

Pas de dépendances externes — il suffit d'avoir Node.js installé.

## Exécution

Lancer l'interface console :

```bash
node src/index.js
```

Exécuter les scénarios/tests (script commenté) :

```bash
node tests/scenarios.js
```

## Fonctions principales

- `ajouterApprenant(id, nomComplet, ville)` : ajoute un apprenant si l'`id` est unique et le nom valide.
- `rechercherApprenant(idOrNom)` : récupère un apprenant par `id` (nombre) ou par nom (chaîne).
- `enregistrerResultat(id, jour, exercicesTermines, totalExercices, challengeTermine)` : ajoute/met à jour un résultat pour un jour donné.
- `calculerProgression(apprenant)` : calcule le pourcentage de progression, le total d'exercices, et le nombre de challenges terminés.
- `filtrerParNiveau(niveau)` : retourne les apprenants dont le niveau ("Solide", "En progression", "À renforcer") correspond.
- `trierParProgression()` : retourne la liste triée par progression décroissante.
- `afficherTableauDeBord()` : affiche un résumé et le détail par apprenant.

## Notes et recommandations

- Les noms sont normalisés en minuscules et n'acceptent que les lettres et espaces (`normaliserNom`).
- La validation des résultats vérifie les bornes (jours 1-7, exercices non négatifs, total > 0, boolean pour `challengeTermine`).
