//faire un fichier login.js
//créer un évènement à la validation du formulaire et appeler connexion(email, mdp)

// Gérer l'envoi du formulaire
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les valeurs du formulaire
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Appeler la fonction connexion
    connexion(email, password);
  });
