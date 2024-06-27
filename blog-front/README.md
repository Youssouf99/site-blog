# Frontend de MES-BLOCKS

Ce répertoire contient le code source et les configurations pour le client frontend de l'application MES-BLOCKS.

## Table des matières

- [Frontend de MES-BLOCKS](#frontend-de-mes-blocks)
  - [Table des matières](#table-des-matières)
  - [Pré-requis](#pré-requis)
  - [Installation](#installation)
  - [Démarrage](#démarrage)
  - [Structure du projet](#structure-du-projet)
  - [Technologies utilisées](#technologies-utilisées)
  - [Fonctionnalités principales](#fonctionnalités-principales)
  - [Scripts disponibles](#scripts-disponibles)

## Pré-requis

- Node.js (version v20.11.1)
- npm (version 10.8.1)

## Installation

Clonez ce dépôt et accédez au répertoire `frontend` :

```bash
git clone https://github.com/Youssouf99/site-blog.git
cd site-blog/frontend
npm install
```

## Démarrage

Pour démarrer le serveur de développement :

```bash
npm start
```

Le frontend sera disponible à l'adresse [http://localhost:3000](http://localhost:3000).

## Structure du projet

- `src/` : Code source principal
  - `components/` : Composants React réutilisables
  - `pages/` : Pages principales de l'application
  - `api/` : Services API pour communiquer avec le backend
  - `utils/` : Fonctions utilitaires
  - `styles/` : Fichiers de style (CSS, SASS, etc.)
  - `App.js` : Composant principal de l'application
  - `index.js` : Point d'entrée principal de l'application

## Technologies utilisées

- React
- Material Tailwind
- Heroicons
- React Router
- Tailwind

## Fonctionnalités principales

- Affichage des articles avec pagination
- Consultation des détails d'un article
- Authentification et inscription des utilisateurs
- Ajout, modification et suppression d'articles (authentification requise)
- Ajout de commentaires (authentification requise)
- Gestion des favoris pour les articles

## Scripts disponibles

Dans le répertoire du projet, vous pouvez exécuter les scripts suivants :

- `npm start` : Démarre le serveur de développement.
- `npm run build` : Construit l'application pour la production.
- `npm test` : Lance les tests unitaires.

---
