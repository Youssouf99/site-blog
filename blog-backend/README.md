### README Backend

---

# Backend de MES-BLOCKS

Ce répertoire contient le code source et les configurations pour le serveur backend de l'application MES-BLOCKS.

## Table des matières

- [Pré-requis](#pré-requis)
- [Installation](#installation)
- [Démarrage](#démarrage)
- [Tests](#tests)
- [Endpoints](#endpoints)
- [Structure du projet](#structure-du-projet)
- [Technologies utilisées](#technologies-utilisées)

## Pré-requis

- Java Development Kit (JDK) (version 17 )
- Maven (version 3.6 )
- Docker (optionnel,  pour la DB MySql & Phpmyadmin)

## Installation

Clonez ce dépôt et accédez au répertoire `backend` :

```bash
git clone https://github.com/Youssouf99/site-blog.git
cd site-blocks/backend
```

## Démarrage

### Démarrage via Maven

```bash
mvn spring-boot:run
```

### Démarrage via Docker

Assurez-vous d'avoir Docker installé, puis exécutez :

```bash
docker-compose up backend
```

## Tests

Pour exécuter les tests unitaires et d'intégration :

```bash
mvn test
```

## Endpoints

### Authentification

- `POST /api/auth/login` : Authentification utilisateur
- `POST /api/auth/logout` : Déconnexion utilisateur
- `POST /api/auth/logoutCurrentUser` : Déconnexion de l'utilisateur actuel
- `GET /api/auth/me` : Récupérer les informations de l'utilisateur connecté
- `GET /api/auth/validate-token` : Valider un token JWT

### Articles

- `GET /api/articles` : Récupérer tous les articles
- `GET /api/articles/{id}` : Récupérer un article par son ID
- `POST /api/articles/{userId}` : Créer un nouvel article (authentification requise)
- `DELETE /api/articles/{id}` : Supprimer un article (authentification requise)
- `POST /api/articles/{userId}/favorites/{articleId}` : Ajouter un article aux favoris (authentification requise)
- `DELETE /api/articles/{userId}/favorites/{articleId}` : Retirer un article des favoris (authentification requise)
- `GET /api/articles/{userId}/favorites` : Récupérer les articles favoris d'un utilisateur
- `GET /api/articles/paged` : Récupérer les articles avec pagination

### Catégories

- `GET /api/categories` : Récupérer toutes les catégories
- `GET /api/categories/{id}` : Récupérer une catégorie par son ID
- `POST /api/categories` : Créer une nouvelle catégorie
- `DELETE /api/categories/{id}` : Supprimer une catégorie

### Commentaires

- `GET /api/comments` : Récupérer tous les commentaires
- `GET /api/comments/{commentId}` : Récupérer un commentaire par son ID
- `POST /api/comments` : Ajouter un commentaire (authentification requise)
- `PUT /api/comments/{commentId}` : Mettre à jour un commentaire (authentification requise)
- `DELETE /api/comments/{commentId}` : Supprimer un commentaire (authentification requise)
- `GET /api/comments/article/{articleId}` : Récupérer les commentaires d'un article

### Utilisateurs

- `GET /api/users` : Récupérer tous les utilisateurs
- `GET /api/users/{id}` : Récupérer un utilisateur par son ID
- `POST /api/users` : Créer un nouvel utilisateur
- `DELETE /api/users/{id}` : Supprimer un utilisateur (authentification requise)

## Structure du Projet

- `src/main/java/com/example/blogbackend` : Code source principal
- `src/test/java/com/example/blogbackend` : Tests unitaires et d'intégration
- `src/main/resources` : Fichiers de configuration
- `src/main/resources/application.properties` : Fichier de configuration de l'application


## Technologies utilisées

- Spring Boot
- Spring Security
- JWT (JSON Web Tokens)
- Hibernate (JPA)
- H2 Database (ou toute autre base de données de votre choix)
- Docker
- MySql

---