# 👶 PédiTri

## 📌 Présentation

**PédiTri** est une application web d'aide à l'orientation des parents face aux symptômes de leurs enfants.

L'application permet au parent de créer le profil de son enfant, de répondre à un questionnaire de triage pédiatrique et d'obtenir une orientation selon les réponses fournies :

- 🟢 Surveillance à domicile
- 🟠 Consultation recommandée
- 🔴 Urgence

Selon le résultat, l'application peut également afficher une liste de pédiatres ou de services d'urgence.

---

## 🎯 Objectifs

- Faciliter l'orientation du parent à travers un questionnaire simple.
- Adapter le questionnaire au groupe d'âge de l'enfant.
- Enregistrer les réponses du triage.
- Déterminer un résultat à la fin du questionnaire.
- Orienter le parent vers des établissements selon le résultat.
- Sécuriser l'accès aux profils des enfants.

---

## ✨ Fonctionnalités

### Authentification
- Inscription d'un parent
- Connexion
- Déconnexion
- Authentification avec Laravel Sanctum
- Routes protégées

### Gestion des enfants
- Ajouter un enfant
- Afficher les enfants du parent
- Modifier un enfant
- Supprimer un enfant
- Protection des profils avec une Policy Laravel

### Triage pédiatrique
- Démarrage d'un triage pour un enfant
- Questionnaire adapté au groupe d'âge
- 6 questions par questionnaire
- Réponses Oui / Non
- Enregistrement de chaque réponse
- Barre de progression
- Calcul du résultat après la dernière question

### Résultat
Trois orientations sont possibles :

- `home` : surveillance à domicile
- `consultation` : consultation médicale recommandée
- `urgence` : prise en charge urgente recommandée

### Établissements
- Affichage des pédiatres pour une consultation
- Affichage des services d'urgence pour une urgence
- Filtrage des établissements par type

---

## 🛠️ Technologies utilisées

### Frontend
- React
- Vite
- JavaScript
- Axios
- React Router
- CSS

### Backend
- PHP
- Laravel
- Laravel Sanctum
- API REST

### Base de données
- MySQL

### Outils
- Git / GitHub
- Postman
- Docker
- Docker Compose
- Docker Hub

---

## 🏗️ Architecture du projet

```text
peditri/
│
├── backend/          # API Laravel
├── frontend/         # Application React
├── docker-compose.yml
└── README.md
```

Le fonctionnement général de l'application suit le flux :

```text
React
  ↓
API REST Laravel
  ↓
Controllers / Services / Models
  ↓
MySQL
  ↓
Réponse JSON
  ↓
React
```

La logique métier du triage est centralisée dans `TriageEngineService`.

---

## 🗃️ Principales entités

- User
- Enfant
- Triage
- Question
- Response
- Etablissement

---

## 🔄 Fonctionnement du triage

1. Le parent se connecte.
2. Il sélectionne ou crée un enfant.
3. Il démarre un triage.
4. L'application détermine le groupe d'âge de l'enfant.
5. Les questions correspondantes sont affichées.
6. Le parent répond aux 6 questions.
7. Chaque réponse est enregistrée avec un niveau :
   - LOW
   - MEDIUM
   - HIGH
8. Après la dernière question, l'application détermine le résultat.
9. Le parent reçoit une orientation.
10. En cas de consultation ou d'urgence, il peut consulter les établissements correspondants.

---

## 🐳 Docker

Le projet peut être exécuté avec Docker.

Services utilisés :

- Frontend React
- Backend Laravel
- MySQL

### Lancer le projet

À la racine du projet :

```bash
docker compose up --build
```

L'application est ensuite accessible sur :

```text
Frontend : http://localhost:5173
Backend  : http://localhost:8000
```

La base MySQL du projet est exposée sur le port `3308`.

---

## 🧪 Tests de l'API

Les principales routes de l'API ont été testées avec **Postman**, notamment :

- Authentification
- Gestion des enfants
- Démarrage du triage
- Enregistrement des réponses
- Résultat du triage
- Liste des établissements

---

## ⚠️ Remarque

PédiTri est un projet pédagogique réalisé dans le cadre d'une formation en développement web.

L'application fournit une orientation à partir d'un questionnaire et ne remplace pas un diagnostic ou un avis médical professionnel.

---

## 👩‍💻 Auteur

**Khaoula Boulahrouf**

Projet Fil Rouge — Développement Web et Web Mobile  
ENAA