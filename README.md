Voici comment tu peux **mettre à jour ton README** pour qu’il corresponde **au TDR MOBISOFT - COMPARATEUR**, tout en gardant ta base existante :

---

# 🌍 AfricaHub - Plateforme de Comparaison de Produits & Services pour l'Afrique

## 📋 Table des Matières

* [Vue d'ensemble](#vue-densemble)
* [Concepts Clés du Métier](#concepts-clés-du-métier)
* [Fonctionnalités par Type d'Utilisateur](#fonctionnalités-par-type-dutilisateur)
* [Technologies Utilisées](#technologies-utilisées)
* [Architecture du Projet](#architecture-du-projet)
* [Structure des Dossiers](#structure-des-dossiers)
* [Installation et Configuration](#installation-et-configuration)
* [Base de Données](#base-de-données)
* [Authentification et Autorisation](#authentification-et-autorisation)
* [API et Microservices](#api-et-microservices)
* [Tests](#tests)
* [Déploiement](#déploiement)
* [Contribution](#contribution)

## 🎯 Vue d'ensemble

AfricaHub est une plateforme web et mobile de **comparaison de produits & services** pour le marché africain. Initialement spécialisée dans l'assurance, elle évolue désormais en un comparateur universel couvrant divers secteurs :

* Électronique (Smartphones, Téléviseurs...)
* Services (Assurances, Forfaits Internet...)
* Automobile (Voitures d'occasion...)
* Autres catégories selon les marchés

L'application s'adresse aussi bien aux **utilisateurs finaux** qu'aux **sociétés partenaires**, et permet la comparaison intelligente multi-critères.

### 🌟 Objectifs Principaux

* Simplifier et enrichir la **comparaison de produits et services**
* Offrir un **moteur de comparaison intelligent** multi-pays, multi-société, multi-produit
* **Support multi-pays** avec gestion de la devise, langue, et contenu localisé
* Fournir une plateforme évolutive et extensible pour de nouveaux secteurs
* Favoriser un écosystème de confiance entre sociétés partenaires et consommateurs

---

## 📚 Concepts Clés du Métier

### 📂 Type de Produits

* Catégories de produits ou services partageant des caractéristiques comparables
* Exemples : Smartphones, Assurances Santé, Forfaits Internet, Voitures d'occasion

### 📦 Produit

* Un élément spécifique appartenant à un type de produit
* Exemples : iPhone 14 Pro, Orange Fibre 30 Mbps, Toyota Corolla 2018

### 📝 Détails de Comparaison

* Critères définissant les différences entre produits d'une même catégorie
* Exemple : Pour un smartphone → autonomie, capacité, prix...

### 🧮 Algorithme de Comparaison

* Logique métier pour trier et recommander les produits selon les préférences utilisateurs ou règles métier
* Exemple : Trier par prix croissant, meilleur rapport qualité/prix, score pondéré

---

## 👥 Fonctionnalités par Type d'Utilisateur

Je te recommande ici de **garder ta structure par rôles (User, Merchant, Manager, Admin)** que tu as très bien décrite.
Voici les ajouts / mises à jour à prévoir en lien avec le TDR :

### 🔵 Utilisateur Simple (User)

➡️ **A compléter avec :**

* Internationalisation automatique / manuelle du pays
* Gestion des devises et langues
* Comparaison multi-produits avec mise en évidence des meilleurs attributs

### 🟢 Marchand (Merchant)

➡️ **A compléter avec :**

* Gestion des produits multi-pays
* Association des produits à leur société
* Page publique pour la société et ses produits

### 🟡 Gestionnaire (Manager)

➡️ **A compléter avec :**

* Dashboard analytique : produits les plus consultés, préférences utilisateurs par région

### 🔴 Administrateur (Admin)

➡️ **A compléter avec :**

* Gestion des pays dans l'interface admin
* Paramétrage multi-devises et multi-langues
* Monitoring des comparaisons les plus faites

---

## 🛠️ Technologies Utilisées

Pas de modification nécessaire ici. Ton stack est cohérent avec les contraintes techniques du TDR :

> Application web responsive / Backend modulaire → ✅ React + Supabase
> Stack flexible → ✅ Supabase, Edge Functions
> Gestion multi-pays / multi-sociétés → compatible avec ton architecture

---

## 📁 Structure des Dossiers

➡️ Ta structure est **déjà très complète et adaptée**.
Je te suggère seulement d'ajouter une **section /critères de comparaison** (qui est clé dans le TDR) :

src
├── App.css
├── App.tsx
├── assets
│   └── react.svg
├── components
│   ├── common
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── layout
│   │   ├── AdminLayout.tsx
│   │   ├── ManagerLayout.tsx
│   │   ├── MerchantLayout.tsx
│   │   └── UserLayout.tsx
│   └── ui
│       ├── accordion.tsx
│       ├── alert.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── input.tsx
│       ├── modal.tsx
├── contexts
├── hooks
│   └── use-mobile.ts
├── index.css
├── lib
│   └── utils.ts
├── main.tsx
├── pages
│   ├── admin
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── manager
│   ├── merchant
│   ├── publics
│   ├── RegisterPage.tsx
│   ├── ResetPasswordPage.tsx
│   └── user

├── services
├── styles
├── types
├── utils
└── vite-env.d.ts

## 🔌 API et Microservices

Ton **comparison-engine** microservice correspond parfaitement au **moteur de comparaison** du TDR.

➡️ Je te recommande de :

* Ajouter dans ce service le support pour les **critères dynamiques par type de produit** (cf. TDR)
* Exposer une API REST ou GraphQL pour permettre au frontend de récupérer dynamiquement les tableaux comparatifs.

---

## 🗄️ Base de Données

➡️ À compléter :

* `comparison_criteria` → table pour stocker les critères par type de produit
* `comparison_values` → table associant chaque produit à ses valeurs pour ces critères

---

## 🚀 Résumé des Principales Mises à Jour

| Section                  | Action recommandée                                                  |
| ------------------------ | ------------------------------------------------------------------- |
| Concepts Clés            | Ajouter section dédiée                                              |
| Fonctionnalités par rôle | Ajouter gestion multi-pays, multi-sociétés, critères de comparaison |
| Structure des dossiers   | Ajouter sous-dossiers pour le moteur de comparaison                 |                                   
| Base de données          | Ajouter tables critères / valeurs de comparaison                    |