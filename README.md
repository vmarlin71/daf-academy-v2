# DAF Academy V3 Clean

Version volontairement **sans build** : HTML/CSS/JavaScript statique.
Il n'y a ni Next.js, ni TypeScript, ni npm à compiler. Cela élimine la classe d'erreurs rencontrées avec les builds précédents.

## Fonctionnalités
- 50 modules structurés en 6 niveaux.
- 16 modules complets avec cours + quiz.
- 64 questions avec explications.
- Validation : cours lu + score quiz >= 70%.
- XP, streak, meilleur score et nombre de tentatives.
- Mode invité local.
- Compte email + synchronisation Supabase entre appareils.
- Fusion automatique de la progression locale et cloud après connexion.
- PWA installable sur mobile.

## Mise en ligne
1. Renseigner `config.js` avec le Project URL et la Publishable key Supabase.
2. Uploader tous les fichiers à la racine d'un repository GitHub propre.
3. Importer le repository dans Vercel avec Framework Preset = Other.
4. Aucun Build Command, aucun Output Directory, aucune variable d'environnement nécessaire.

## Supabase
Le schéma requis est dans `supabase/schema.sql`.
Si le schéma V2 a déjà été exécuté, ne rien refaire : V3 utilise les mêmes tables.

## Sécurité
La Publishable key Supabase est faite pour être utilisée côté navigateur. La sécurité des données repose sur les règles RLS du schéma.
Ne jamais mettre une `service_role` key ou une Secret key dans `config.js`.
