# CatSitter ![Logo de catsitter](https://zupimages.net/up/20/07/yj9a.png)
Application web de gardiennage pour chats

L'application proposera dans sa première version deux fonctionnalités :
  - Poster une annonce
  - Répondre à une annonce via un envoi de mail
  
Une page d'accueil répertoriera les dernières annonces postées.<br />
Une page de contact affichera les coordonnées de Catsitter, et permettra de laisser un message.

Pour installer le projet en local :
- Installer MongoDB, créer une BDD appelée catsitter et créer une collection appelée annonces dans cette BDD
- Git clone du projet sinon download le .zip
- Ouvrir le projet avec un éditeur
- Créer le fichier .env en local à la racine du projet et écrire dedans :
<pre><code>MONGO_SRV=<i>chaine_de_connexion_mongo</i></code></pre>
- Dans un terminal situé à la racine du projet :
  - Faire un npm install afin d'installer tous les packages : <pre><code>npm install</code></pre>
  - Excécuter le script dev qui se trouve dans l'onglet NPM SCRIPTS
- Dans un navigateur, ouvrir l'URL localhost:3000

Captures :

![img accueil](https://zupimages.net/up/20/07/ezua.png )
![img accueil2](https://zupimages.net/up/20/07/etkj.png)
![img poster annonce](https://zupimages.net/up/20/07/tpr0.png)
![img reponse annonce](https://zupimages.net/up/20/07/67qa.png )
![img contact](https://zupimages.net/up/20/07/8lyw.png )

