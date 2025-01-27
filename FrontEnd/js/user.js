// Fonction pour se connecter
async function connexion(email, password) {
  const apiUrl = "http://localhost:5678/api/users/login";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Échec de la connexion");
    }

    const data = await response.json();

    // Stocker le token dans le localStorage
    localStorage.setItem("authToken", data.token);

    // Redirection vers la page d'edition
    window.location.href = "index.html";
  } catch (error) {
    //Si pb de connexion => msg d'erreur
    alert("Erreur dans l’identifiant ou le mot de passe");
  }
}

// Fonction pour ajouter les options admin à la page
function afficherLiensAdmin() {
  const header = document.querySelector(".edit-bar");
  if (header) {
    const boutonModifier = document.createElement("button");
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-pen-to-square";
    icon.style.marginRight = "8px";

    const texte = document.createTextNode("Mode édition");
    boutonModifier.appendChild(icon);
    boutonModifier.appendChild(texte);
    boutonModifier.className = "btn-admin";
    boutonModifier.addEventListener("click", () => {
      alert("Mode édition activé !");
    });
    header.appendChild(boutonModifier);
  }
}

// Fonction pour gérer l'affichage de l'espace admin
function espaceAdmin() {
  // Récupérer le token dans le localStorage
  const token = localStorage.getItem("authToken");

  if (token) {
    // Si un token existe, afficher les options admin
    afficherLiensAdmin();
  } else {
    console.log("Utilisateur non administrateur.");
  }
}

function deconnexion() {
  // Supprimer le token du localStorage
  localStorage.removeItem("authToken");

  // Rediriger vers la page d'accueil
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");
  const token = localStorage.getItem("authToken");

  if (token) {
    // Si le token existe, changer "Login" en "Logout"
    loginLink.textContent = "logout";
    loginLink.href = "#"; // Enlever le lien vers la page de login

    // Gérer la déconnexion au clic
    loginLink.addEventListener("click", (e) => {
      e.preventDefault(); // Empêcher la redirection
      localStorage.removeItem("authToken"); // Supprimer le token
      window.location.href = "index.html"; // Rediriger vers l'accueil
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("authToken");
  const filtresSection = document.querySelector(".filtres");

  if (token && filtresSection) {
    // Si le token existe (mode édition), masquer les filtres
    filtresSection.style.display = "none"; // Masquer la section
  }
});
