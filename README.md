# Site Angular pour afficher les anciens élèves

Site créé par Vincent Darcemont.

## Lancer le site

Lancer `ng serve -o`.

## Inscription

Lors de l'inscription, vous devez au minimum renseigner un pseudo, un mot de passe, un nom et un prénom.

Vous devez également accepter la règle RGPD qui est également accessible dans le footer.

En tant qu'étudiant, vous pouvez ou non indiquer votre promotion et votre entreprise. 
Vous pouvez aussi choisir si elles sont visibles au public.

## Connexion

Certains comptes sont présents dans le fichier `assets/datas/etudiant.json`.

Vous pouvez par exemple vous connecter avec : pseudo : test, mdp : test

Une fois connecté, vous avez acces à l'onglet étudiants et à votre profil.

## Onglet étudiants

Vous pouvez voir la liste des étudiants, un icône remplace les champs non-visibles au public.
Si cet étudiant est vous-même un texte (vous) sera visible à coté de votre nom.

Vous pouvez cliquer sur la flèche dans détail pour accéder à leur profil.
Si le profil est le vôtre, l'entreprise et la promotion sera visible. Vous pouvez également modifier ou supprimer votre compte.

## Administrateur

Pour vous connecter en admin : pseudo : admin, mdp: admin

Dans la bdd, un admin possède le champs admin:true. Donc vous pouvez créer d'autres admin en le créant dans la bdd.

Un admin a le détail complet pour chaque étudiant (entreprise et promotion visibles) et peut modifier ou supprimer chaque compte.
