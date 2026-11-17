# Déploiement : Vercel + Postgres

Le site est statique (Vite), l'API des candidatures tourne en **fonctions serverless**
Vercel (`api/audition-submissions/…`) et les candidatures sont stockées dans **Postgres**
(Neon via le Marketplace Vercel). L'analyse en ligne de `/resultats` lit donc les
mêmes données depuis n'importe quel poste.

## 1. Créer la base

1. Ouvrir le projet sur [vercel.com](https://vercel.com) → onglet **Storage**.
2. **Create Database / Marketplace** → **Neon Postgres** (Vercel Postgres n'existe
   plus nativement depuis 2024), choisir une région proche (ex. Europe).
3. Connecter la base au projet : l'intégration injecte automatiquement
   `DATABASE_URL` (et d'anciennes variables `POSTGRES_URL`), les deux sont gérées
   par le code.
4. Si la base est créée hors Vercel (Neon, Supabase…), ajouter manuellement
   `DATABASE_URL` dans **Settings → Environment Variables** (utiliser la chaîne
   *pooled* de préférence).

## 2. Configurer le code admin

Dans **Settings → Environment Variables**, définir :

| Variable | Valeur |
|---|---|
| `ADMIN_CODE` | un code long et privé (remplace `club-git-admin`) |
| `DATABASE_URL` | fournie par l'intégration Postgres |

Appliquer à **Production** et **Preview**. Sans `ADMIN_CODE`, les routes
administrateur renvoient `503 ADMIN_CODE_NOT_CONFIGURED` sur Vercel (aucun mot de
passe par défaut). Sans `DATABASE_URL`, les routes API renvoient une erreur 500
explicite : aucun stockage éphémère silencieux.

## 3. Déployer

- `git push` sur la branche connectée, ou `vercel --prod`.
- Build : `npm run build` (Vite), sortie `dist/`.
- API : une fonction par route sous `api/audition-submissions/` (`index.ts`,
  `[id].ts`, `admin/check.ts`), toutes branchées sur l'application Express
  `server/api.ts`.
- `vercel.json` réécrit le reste vers `/index.html` (SPA) sans intercepter `/api`.

Au premier appel, l'API crée la table `audition_submissions` (voir
`server/postgresStore.ts`). Le schéma de référence est dans `server/schema.sql`
si vous préférez le créer manuellement.

## 4. Vérifier

```bash
curl -H "x-admin-code: VOTRE_CODE" https://votre-projet.vercel.app/api/audition-submissions/admin/check
# → {"ok":true,"storage":"postgres"}
```

Puis ouvrir `/resultats`, saisir le code admin, et vérifier les onglets
**Candidatures** et **Analyse en ligne** depuis deux machines différentes.

## 5. Développement local

```bash
cp .env.example .env.local   # puis renseigner DATABASE_URL et ADMIN_CODE
npm run dev
```

- Avec `DATABASE_URL` : mêmes données que la production (attention aux tests).
- Sans `DATABASE_URL` : repli sur `data/audition-submissions.json` (local,
  ignoré par Git), pratique pour développer hors ligne.
- `npm run build` puis `npm start` sert le site et l'API sur un seul port
  (hôte classique, avec base Postgres ou fichier local).

## Notes

- Aucun stockage navigateur : ni `localStorage` ni `sessionStorage` ne conservent
  les candidatures ou le code admin. Si l'API est indisponible, le formulaire
  affiche une erreur explicite et n'enregistre rien.
- Le fichier `data/audition-submissions.json` n'est jamais versionné (données
  personnelles).
- Le pool de connexions est réutilisé entre invocations d'une même instance
  serverless (`server/db.ts`).
- Vercel ne fournit pas de disque persistant : ne jamais revenir à un stockage
  fichier en production.
