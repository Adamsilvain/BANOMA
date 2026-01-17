# Résumé
-------
Ce pull request initialise le scaffold MVP de BANOMA : monorepo contenant le frontend (Next.js PWA), backend (NestJS), microservice IA (FastAPI stub), worker vidéo (FFmpeg + Bull/Redis), intégrations de paiment (Stripe skeleton + adaptateur M‑Pesa), infra dev (docker‑compose), infra prod skeleton (K8s manifests + Helm), CI/CD skeleton (GitHub Actions), et squelette mobile Flutter. Inclut aussi templates de gouvernance (LICENSE, CONTRIBUTING, SECURITY, PR/Issue templates).

# Fichiers / Additions clés
-------------------------
- apps/web/ — Next.js PWA skeleton (pages, build)
- apps/mobile/ — Flutter skeleton (pubspec + README)
- services/api/ — NestJS API skeleton + video controller + worker + payments skeleton
- services/ai/ — FastAPI AI stubs (summarize / translate / recommend)
- services/api/worker — worker FFmpeg + Bull queue (Dockerfile + worker code)
- infra/docker-compose.yml — dev stack (Postgres, MinIO, Redis, api, web, ai, worker)
- infra/k8s/ & infra/helm/ — manifests & Helm chart skeleton
- .github/ — CI workflows (ci & cd skeleton), templates, SECURITY.md, CONTRIBUTING.md
- LICENSE — MIT

# Instructions rapides pour test local
-----------------------------------
1. git clone git@github.com:Adamsilvain/banoma.git
2. git checkout init-scaffold
3. cp .env.example .env  (puis compléter les valeurs sensibles : JWT_SECRET, POSTGRES credentials, S3 keys, REDIS_HOST, STRIPE keys)
4. docker-compose up --build
5. Accès :
   - Web : http://localhost:3000
   - API : http://localhost:4000
   - AI docs : http://localhost:8000/docs

# Secrets / configuration CI & CD (NE PAS pousser en clair)
---------------------------------------------------------
- PROD_DATABASE_URL
- DOCKERHUB_USERNAME / DOCKERHUB_TOKEN (ou ECR creds)
- AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY (si deployment AWS)
- S3_ACCESS_KEY / S3_SECRET_KEY (prod)
- JWT_SECRET
- REDIS_URL
- STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET
- M_PESA_CLIENT_ID / M_PESA_CLIENT_SECRET
- KUBECONFIG or provider connector for GH Actions

# Points importants & risques connus
----------------------------------
- Le worker transcode via ffmpeg : l’image doit inclure ffmpeg (image fournie mais à vérifier).  
- Les endpoints Stripe webhook exigent une URL publique (utiliser ngrok pour tests locaux).  
- L’adapter M‑Pesa est un skeleton — integration réelle demande credentials & tests.  
- Les secrets ne sont pas inclus : configurer GitHub Secrets avant d’activer workflows CD.

# Checklist pour la revue
-----------------------
- [ ] Vérifier qu’aucune clé secrète n’a été committée
- [ ] Lancer la stack localement et tester : /api/feed, /api/videos/upload (uploader URL public), worker transcode
- [ ] Tester Stripe sandbox checkout flow (ngrok pour webhook)
- [ ] Valider templates et LICENSE
- [ ] Lancer lint/build pour web & api via CI

# Next steps (après merge)
------------------------
- Ajouter tests unitaires et d’intégration (API + worker)
- Durcir la sécurité (SAST/DAST), observability (Prometheus/Grafana)
- Remplacer MinIO par AWS S3 pour prod, configurer CDN
- Finaliser mobile Flutter (auth, playback HLS)
- Rédiger playbook de runbook pour worker & transcodage

# Relecteurs recommandés
----------------------
- @AdamaOuedraogo (fondateur / produit)
- @cto‑candidate (tech lead / infra)
- @trello‑ci (devops)