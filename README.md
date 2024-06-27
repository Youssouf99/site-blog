# Présentation Complète du Projet MES-BLOCKS

---

## Introduction

**MES-BLOCKS** est une application de blog moderne et sécurisée permettant aux utilisateurs de publier, consulter et gérer des articles. Le projet se compose de deux parties principales : un backend basé sur Spring Boot et un frontend construit avec React.

## Table des matières

- [Présentation Complète du Projet MES-BLOCKS](#présentation-complète-du-projet-mes-blocks)
  - [Introduction](#introduction)
  - [Table des matières](#table-des-matières)
  - [Pré-requis](#pré-requis)
  - [Installation](#installation)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Démarrage](#démarrage)
      - [Backend](#backend-1)
      - [Frontend](#frontend-1)
  - [Structure du Projet](#structure-du-projet)
    - [Backend](#backend-2)
    - [Frontend](#frontend-2)
  - [Technologies utilisées](#technologies-utilisées)
    - [Backend](#backend-3)
    - [Frontend](#frontend-3)
  - [Fonctionnalités](#fonctionnalités)
    - [Authentification](#authentification)
    - [Articles](#articles)
    - [Commentaires](#commentaires)
    - [Utilisateurs](#utilisateurs)
  - [Contributions](#contributions)

## Pré-requis

- Node.js (version 20)
- Java Development Kit (JDK) (version 17)
- Maven (version 3.6)
- Docker (pour la DB mysql et phpmyadmin)

## Installation

Clonez ce dépôt sur votre machine locale :

```bash
git clone https://github.com/Youssouf99/site-blog.git
cd site-blog
```

### Backend

Instructions spécifiques pour le backend [ici](backend/README.md).

### Frontend

Instructions spécifiques pour le frontend [ici](frontend/README.md).

## Démarrage

#### Backend

```bash
cd backend
mvn spring-boot:run
```

#### Frontend

```bash
cd frontend
npm install
npm start
```

## Structure du Projet

- `backend/` : Code source et configurations pour le serveur backend.
- `frontend/` : Code source et configurations pour le client frontend.

### Backend

- `src/main/java/com/example/blogbackend` : Code source principal
- `src/test/java/com/example/blogbackend` : Tests unitaires et d'intégration
- `src/main/resources` : Fichiers de configuration
- `src/main/resources/application.properties` : Fichier de configuration de l'application

### Frontend

- `src/` : Code source principal
  - `components/` : Composants React réutilisables
  - `pages/` : Pages principales de l'application
  - `api/` : Services API pour communiquer avec le backend
  - `utils/` : Fonctions utilitaires
  - `styles/` : Fichiers de style (CSS, SASS, etc.)
  - `App.js` : Composant principal de l'application
  - `index.js` : Point d'entrée principal de l'application

## Technologies utilisées

### Backend

- Spring Boot
- Spring Security
- JWT (JSON Web Tokens)
- Hibernate (JPA)
- H2 Database (ou toute autre base de données de votre choix)
- MySql

### Frontend

- React
- Material Tailwind
- Heroicons
- React Router

## Fonctionnalités

### Authentification

- **Inscription** et **Connexion** des utilisateurs.
- **Gestion des Tokens JWT** pour sécuriser les endpoints.

### Articles

- **Création**, **Modification** et **Suppression** d'articles (authentification requise).
- **Consultation** des articles avec pagination.
- **Ajout aux Favoris** et **Suppression des Favoris**.

### Commentaires

- **Ajout**, **Modification** et **Suppression** de commentaires (authentification requise).
- **Consultation** des commentaires.

### Utilisateurs

- **Gestion des utilisateurs** (admin).
- **Récupération des informations utilisateur**.

## Contributions

Les contributions sont les bienvenues ! Veuillez lire le fichier [CONTRIBUTING.md](CONTRIBUTING.md) pour plus de détails sur notre code de conduite et le processus de soumission des demandes de tirage (pull requests).

---
