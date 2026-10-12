# Cahier des charges — Application Soundboard

**Formation :** Développeur Web et Web Mobile (DWWM)  
**Architecture :** React (front-end), Node.js / Express (back-end), MySQL (base de données)  
**Version :** 1.0

## 1. Présentation du projet

L’application Soundboard permet de consulter une bibliothèque de 12 sons prédéfinis et de les écouter depuis une interface web responsive. Le projet utilise React pour l’interface, Node.js et Express pour l’API REST, et MySQL pour stocker les métadonnées des sons et leurs catégories.

Les fichiers audio sont servis depuis un répertoire statique ou un hébergement dédié. La base de données conserve leurs chemins et métadonnées, et non les fichiers audio eux-mêmes.

## 2. Objectifs pédagogiques

- Analyser un besoin et formaliser un cahier des charges.
- Développer une interface responsive avec React.
- Concevoir une API REST avec Node.js et Express.
- Concevoir une base de données relationnelle MySQL.
- Réaliser les opérations CRUD et connecter l’application à la base.
- Communiquer entre le front-end et le back-end avec Fetch ou Axios.
- Valider les données, gérer les erreurs et appliquer les bonnes pratiques de sécurité.
- Écrire des tests, documenter le projet et utiliser Git.

## 3. Périmètre fonctionnel

### 3.1 Fonctionnalités du MVP

| Référence | Fonctionnalité | Description |
|---|---|---|
| F01 | Bibliothèque | Afficher les 12 sons depuis l’API. |
| F02 | Lecture audio | Lancer un son sélectionné. |
| F03 | Lecture exclusive | Arrêter le son précédent lorsqu’un autre est lancé. |
| F04 | Arrêt | Arrêter le son en cours. |
| F05 | Volume | Régler le volume entre 0 et 100 %. |
| F06 | Catégories | Filtrer les sons par catégorie. |
| F07 | Responsive | Adapter l’interface aux ordinateurs, tablettes et mobiles. |
| F08 | API REST | Exposer les sons et catégories via Express. |
| F09 | Persistance | Stocker les sons et catégories dans MySQL. |
| F10 | Gestion des erreurs | Signaler les erreurs réseau, API ou audio. |

### 3.2 Hors périmètre

- Inscription et connexion des utilisateurs.
- Import de fichiers audio par les utilisateurs.
- Favoris personnalisés et playlists.
- Lecture simultanée de plusieurs sons.
- Interface d’administration complète.
- Paiement ou abonnement.

Les opérations d’ajout, de modification et de suppression peuvent être proposées comme exercice CRUD complémentaire. Si elles sont accessibles dans l’application, elles doivent être protégées par une authentification et des contrôles d’autorisation.

## 4. Architecture technique

```text
Navigateur
    |
    v
Front-end React
    |  Requêtes HTTP / JSON
    v
API REST Node.js / Express
    |
    v
Base de données MySQL

Fichiers audio : répertoire statique ou hébergement dédié
```

### 4.1 Front-end

- React et Vite.
- HTML5 et CSS3.
- Fetch API ou Axios.
- API audio du navigateur (`HTMLAudioElement`).
- Vitest et React Testing Library pour les tests.

Responsabilités : afficher la bibliothèque, gérer les filtres et commandes audio, appeler l’API, afficher les états de chargement et les erreurs.

### 4.2 Back-end

- Node.js et Express.
- `mysql2` pour l’accès à MySQL.
- `dotenv` pour les variables d’environnement.
- `helmet` pour certains en-têtes HTTP.
- CORS configuré uniquement pour les origines autorisées.
- Supertest pour tester l’API.

Responsabilités : exposer les routes REST, valider les entrées, appliquer la logique métier, interroger MySQL et renvoyer des réponses JSON cohérentes.

### 4.3 Base de données

- MySQL avec encodage `utf8mb4`.
- Clés primaires et étrangères.
- Requêtes préparées ou paramétrées.
- Script de création du schéma et script de données initiales.

## 5. Règles de gestion

- **RG01 :** seuls les sons enregistrés et disponibles sont affichés.
- **RG02 :** un seul son peut être joué à la fois.
- **RG03 :** lancer un nouveau son arrête le précédent.
- **RG04 :** le volume initial est fixé à 70 %.
- **RG05 :** l’utilisateur peut arrêter le son en cours.
- **RG06 :** le filtre de catégorie n’affiche que les sons correspondants.
- **RG07 :** une erreur de l’API est signalée clairement.
- **RG08 :** un fichier audio inaccessible ne doit pas bloquer toute l’interface.
- **RG09 :** les données reçues par l’API sont validées avant modification en base.
- **RG10 :** les erreurs ne doivent pas exposer les identifiants MySQL ou des informations sensibles.

## 6. Modèle de données MySQL

Deux tables suffisent pour le périmètre initial.

### 6.1 Table `categories`

| Champ | Type | Contraintes | Description |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | Identifiant de la catégorie |
| `name` | VARCHAR(100) | NOT NULL | Nom de la catégorie |
| `slug` | VARCHAR(100) | NOT NULL, UNIQUE | Identifiant lisible |

### 6.2 Table `sounds`

| Champ | Type | Contraintes | Description |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | Identifiant du son |
| `name` | VARCHAR(150) | NOT NULL | Nom du son |
| `description` | VARCHAR(255) | NULL | Description facultative |
| `file_path` | VARCHAR(255) | NOT NULL | Chemin du fichier audio |
| `category_id` | INT | FK, NOT NULL | Catégorie associée |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Date de création |

Une catégorie peut contenir plusieurs sons ; chaque son appartient à une catégorie.

### 6.3 Script SQL initial

```sql
CREATE DATABASE soundboard
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE soundboard;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE sounds (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description VARCHAR(255),
  file_path VARCHAR(255) NOT NULL,
  category_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_sounds_categories
    FOREIGN KEY (category_id)
    REFERENCES categories(id)
);
```

Un script `seed.sql` devra insérer les catégories et les 12 sons de démonstration. Les fichiers audio correspondants doivent être présents à l’emplacement indiqué par `file_path`.

## 7. API REST

Préfixe des routes : `/api`.

| Méthode | Route | Rôle | Réponse indicative |
|---|---|---|---|
| GET | `/api/sounds` | Récupérer tous les sons | `200 OK` |
| GET | `/api/sounds/:id` | Récupérer un son | `200 OK` ou `404 Not Found` |
| GET | `/api/categories` | Récupérer les catégories | `200 OK` |
| GET | `/api/categories/:id/sounds` | Récupérer les sons d’une catégorie | `200 OK` |
| POST | `/api/sounds` | Ajouter un son, si autorisé | `201 Created` |
| PUT | `/api/sounds/:id` | Modifier un son, si autorisé | `200 OK` ou `404 Not Found` |
| DELETE | `/api/sounds/:id` | Supprimer un son, si autorisé | `204 No Content` ou `404 Not Found` |

Les routes d’écriture sont facultatives pour le MVP. Si elles sont développées, elles doivent être protégées par une authentification et une autorisation adaptées.

### 7.1 Exemple de réponse JSON

Requête : `GET /api/sounds`

```json
[
  {
    "id": 1,
    "name": "Applaudissements",
    "description": "Un public qui applaudit",
    "file_path": "/audio/applaudissements.mp3",
    "category_id": 1
  },
  {
    "id": 2,
    "name": "Cloche",
    "description": "Une cloche qui sonne",
    "file_path": "/audio/cloche.mp3",
    "category_id": 2
  }
]
```

Les données doivent provenir de MySQL par l’intermédiaire de l’API et ne doivent pas être codées en dur dans React.

## 8. Organisation des fichiers

```text
soundboard/
├── frontend/
│   ├── public/
│   │   └── audio/
│   └── src/
│       ├── components/
│       │   ├── SoundCard.jsx
│       │   ├── SoundList.jsx
│       │   ├── CategoryFilter.jsx
│       │   └── VolumeControl.jsx
│       ├── services/
│       │   └── soundService.js
│       ├── App.jsx
│       └── main.jsx
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── soundRoutes.js
│   │   │   └── categoryRoutes.js
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── config/
│   │   │   └── database.js
│   │   └── app.js
│   ├── sql/
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── .env.example
│   └── package.json
└── README.md
```

Cette arborescence est une proposition. Les étudiants peuvent l’adapter en conservant une séparation claire entre routes, contrôleurs, accès aux données et composants d’interface.

## 9. User stories et critères d’acceptation

### US01 — Consulter les sons

**En tant qu’utilisateur**, je veux voir les sons disponibles afin de choisir celui que je souhaite écouter.

Critères :
- La liste est chargée depuis l’API.
- Chaque son affiche au minimum son nom et sa catégorie.
- Un état de chargement est visible pendant la requête.
- Une erreur réseau produit un message compréhensible.

### US02 — Écouter un son

**En tant qu’utilisateur**, je veux lancer un son en cliquant sur sa carte ou son bouton.

Critères :
- Le son sélectionné démarre si le fichier est accessible.
- L’interface indique quel son est en cours de lecture.
- Une erreur de lecture est gérée.

### US03 — Arrêter ou remplacer le son

**En tant qu’utilisateur**, je veux arrêter le son ou en lancer un autre sans superposition.

Critères :
- Le bouton d’arrêt arrête le son actif.
- Le lancement d’un autre son arrête le précédent.
- L’état visuel est actualisé.

### US04 — Régler le volume

**En tant qu’utilisateur**, je veux régler le volume de lecture.

Critères :
- Le volume est réglable de 0 à 100 %.
- Le volume initial est de 70 %.
- Le contrôle est utilisable au clavier.

### US05 — Filtrer par catégorie

**En tant qu’utilisateur**, je veux filtrer les sons pour trouver plus facilement celui qui m’intéresse.

Critères :
- Les catégories proviennent de l’API.
- Le filtre affiche uniquement les sons de la catégorie sélectionnée.
- Une option permet de revenir à tous les sons.

### US06 — Utiliser l’application sur mobile

**En tant qu’utilisateur**, je veux utiliser l’application sur un petit écran.

Critères :
- Les cartes et commandes restent lisibles.
- Aucun défilement horizontal inutile n’apparaît.
- Les commandes sont suffisamment grandes pour être touchées.

## 10. Exigences non fonctionnelles

### Performance
- L’interface reste réactive lors de l’affichage des 12 sons.
- Les requêtes SQL sont limitées aux données nécessaires.
- Les fichiers audio sont optimisés pour un chargement raisonnable.

### Accessibilité
- Les commandes possèdent des libellés accessibles.
- L’application peut être utilisée au clavier.
- Le focus clavier est visible.
- Les informations ne reposent pas uniquement sur la couleur.
- Les contrastes et la structure des titres sont soignés.

### Compatibilité
- Tester les versions récentes de Chrome, Firefox, Edge et Safari.
- Vérifier le rendu sur ordinateur, tablette et mobile.

### Sécurité
- Utiliser des requêtes SQL paramétrées.
- Valider les paramètres et le corps des requêtes côté serveur.
- Ne jamais versionner le fichier `.env`.
- Fournir un `.env.example` sans secret.
- Limiter CORS aux origines nécessaires.
- Ne pas renvoyer les détails internes des erreurs en production.
- Protéger les routes d’écriture par authentification et autorisation si elles sont activées.

## 11. Plan de tests et recette

| ID | Test | Résultat attendu |
|---|---|---|
| T01 | Charger la bibliothèque | Les sons sont récupérés depuis l’API. |
| T02 | API indisponible | Un message d’erreur est affiché. |
| T03 | Lire un son | Le son démarre et son état est visible. |
| T04 | Lire un deuxième son | Le premier son s’arrête. |
| T05 | Arrêter le son | La lecture s’arrête. |
| T06 | Régler le volume à 0 % | Le son est inaudible. |
| T07 | Régler le volume à 100 % | Le volume est maximal. |
| T08 | Filtrer une catégorie | Seuls les sons concernés sont affichés. |
| T09 | Demander un identifiant inexistant | L’API renvoie `404 Not Found`. |
| T10 | Envoyer des données invalides | L’API renvoie une erreur adaptée. |
| T11 | Vérifier le responsive | L’interface reste utilisable sur mobile. |
| T12 | Tester au clavier | Les commandes essentielles sont accessibles. |

Tests automatisés minimum recommandés :
- Tests des fonctions de service et composants React.
- Tests des routes Express avec Supertest.
- Tests des requêtes et contraintes principales de la base.
- Test manuel de lecture audio sur un navigateur de bureau et un navigateur mobile.

## 12. Planning pédagogique indicatif

| Jour | Activités | Livrables |
|---|---|---|
| J1 | Analyse du besoin, périmètre, user stories | Cahier des charges |
| J2 | Maquettes, MCD/MLD, conception de l’API | Maquettes, schéma de données |
| J3 | Initialisation React, Express et MySQL | Structure technique |
| J4 | Routes, contrôleurs et accès MySQL | API opérationnelle |
| J5 | Interface React et connexion à l’API | Application intégrée |
| J6 | Audio, responsive, tests et corrections | Version testée |
| J7 | Finalisation, documentation et démonstration | Livraison finale |

Ce planning est indicatif et peut être adapté au niveau du groupe et à la durée du module.

## 13. Livrables attendus

1. Cahier des charges finalisé.
2. Maquettes de l’interface.
3. Schéma de base de données.
4. Scripts SQL de création et de données initiales.
5. Code source du front-end React.
6. Code source du back-end Node.js / Express.
7. Tests essentiels.
8. Fichier `.env.example` sans secret réel.
9. README expliquant les prérequis, l’installation, la configuration, le lancement et les tests.
10. Démonstration fonctionnelle.

## 14. Barème pédagogique indicatif

Barème proposé sur 100 points ; il ne s’agit pas d’un barème officiel du titre professionnel.

| Critère | Points |
|---|---:|
| Analyse, user stories et conception | 10 |
| Modélisation MySQL et scripts SQL | 15 |
| API REST Express et logique métier | 20 |
| Interface React et responsive | 20 |
| Lecture audio et volume | 10 |
| Tests et gestion des erreurs | 10 |
| Sécurité et bonnes pratiques | 5 |
| Git, documentation et démonstration | 10 |
| **Total** | **100** |

## 15. Consignes de réalisation

Avant de commencer le développement, faire valider :
- Le périmètre fonctionnel et les user stories.
- Les maquettes principales.
- Le modèle de données.
- Les routes de l’API et les formats JSON.
- L’organisation des dossiers et la stratégie de tests.

Les étudiants doivent pouvoir expliquer les choix techniques, démontrer le fonctionnement de l’application et justifier la séparation entre front-end, back-end et base de données.