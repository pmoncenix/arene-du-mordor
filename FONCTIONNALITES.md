# Fonctionnalités de l'application

Application : moncenip-toh2025  
Thème : gestion de héros et d’armes inspirée du Tour of Heroes.

---

## 1. Aperçu global

L’application permet de :

- Créer, modifier et supprimer des héros.
- Créer, modifier et supprimer des armes.
- Visualiser rapidement les héros et armes “intéressants” sur un dashboard.
- Appliquer des règles de jeu pour garder des personnages équilibrés.
- Sauvegarder les données de façon persistante (base distante).

---

## 2. Gestion des héros

### 2.1 Liste des héros

- Affichage de tous les héros dans un tableau.
- Filtre par nom : recherche en direct sur le nom du héros.
- Tri possible sur plusieurs colonnes :
  - nom,
  - attaque,
  - esquive,
  - dégâts,
  - points de vie.
- Affichage :
  - des caractéristiques de base du héros,
  - de l’arme équipée (si présente),
  - des caractéristiques totales en tenant compte de l’arme (attaque, esquive, dégâts, points de vie).
- Actions :
  - consulter / éditer un héros,
  - supprimer un héros.

### 2.2 Création / édition d’un héros

- Formulaire dédié pour :
  - créer un nouveau héros,
  - modifier un héros existant.
- Champs :
  - nom du héros,
  - points d’attaque, d’esquive, de dégâts, de vie,
  - arme équipée (facultatif).
- Aide à la répartition des points :
  - compteur de points utilisés et de points restants,
  - indication visuelle lorsque la limite de points est dépassée.
- Choix d’une arme :
  - liste des armes disponibles,
  - possibilité de ne choisir aucune arme,
  - les armes qui ne peuvent pas être équipées (stats impossibles) sont désactivées.
- Validation :
  - tous les champs nécessaires doivent être remplis,
  - le total de points ne doit pas dépasser le maximum autorisé,
  - l’arme choisie ne doit pas rendre une caractéristique négative ou nulle.

---

## 3. Gestion des armes

### 3.1 Liste des armes

- Affichage de toutes les armes dans un tableau.
- Filtre par nom.
- Tri possible sur :
  - nom,
  - attaque,
  - esquive,
  - dégâts,
  - points de vie.
- Affichage :
  - des valeurs de l’arme (bonus/malus sur chaque caractéristique),
  - d’un indicateur de “points totaux” (arme équilibrée ou non),
  - du nombre de héros équipés avec cette arme.
- Actions :
  - consulter / éditer une arme,
  - supprimer une arme.

### 3.2 Création / édition d’une arme

- Formulaire pour :
  - créer une nouvelle arme,
  - modifier une arme existante.
- Champs :
  - nom de l’arme,
  - modification d’attaque, d’esquive, de dégâts, de vie.
- Guidage :
  - les valeurs possibles sont limitées (par exemple entre -5 et +5),
  - un compteur indique si l’arme est globalement équilibrée (somme des modifications égale à 0).
- Section informative :
  - liste des héros actuellement équipés avec cette arme, pour visualiser l’impact d’un changement ou d’une suppression.
- Validation :
  - l’arme doit respecter les bornes autorisées,
  - l’arme doit rester globalement équilibrée.

---

## 4. Règles métier principales

- Chaque héros dispose d’un budget de points à répartir dans ses caractéristiques de base.
- Les armes ne créent pas gratuitement de la puissance :
  - elles redistribuent les points (bonus sur certaines caractéristiques, malus sur d’autres).
- Un héros ne peut pas équiper une arme qui ferait descendre une de ses caractéristiques en dessous du minimum autorisé.
- La suppression d’une arme ou d’un héros met à jour immédiatement les listes et les compteurs associés.

---

## 5. Dashboard

- Vue d’ensemble de l’application.
- Mise en avant :
  - de quelques héros forts (par exemple avec beaucoup d’attaque ou de dégâts),
  - de quelques armes marquantes (celles qui modifient fortement les dégâts).
- Accès rapide :
  - clic sur un héros → page d’édition du héros,
  - clic sur une arme → page d’édition de l’arme.

---

## 6. Messages et retours utilisateur

- Un panneau de messages affiche les actions importantes :
  - création, modification, suppression d’un héros ou d’une arme,
  - problèmes liés aux règles métier (limites dépassées, armes non équipables, etc.).
- Possibilité de vider la liste des messages.
- Les messages permettent de suivre ce qui se passe dans l’application sans devoir inspecter la base de données.

---

## 7. Sauvegarde des données

- Les héros et les armes sont enregistrés dans une base de données distante.
- Toute action (ajout, modification, suppression) est :
  - visible immédiatement dans l’interface,
  - enregistrée de manière persistante pour les prochaines utilisations de l’application.
