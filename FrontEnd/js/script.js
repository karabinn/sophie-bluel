// ETAPE 1 URL de l'image
const imageUrl = "http://localhost:5678/images/abajour-tahina1651286843956.png";

// Création des éléments nécessaires
const figure = document.createElement("figure");
const img = document.createElement("img");
const figcaption = document.createElement("figcaption");

// Configuration des attributs et du contenu
img.src = imageUrl;
img.alt = "Abat-jour Tahina"; // Texte alternatif pour l'image
figcaption.textContent = "Abat-jour Etape 1";

// Assemblage de la figure
figure.appendChild(img);
figure.appendChild(figcaption);


// Récupération de l'élément parent où insérer la figure
const gallery = document.querySelector(".gallery");

// Ajout de la figure dans la galerie
if (gallery) {
  gallery.appendChild(figure);
} else {
  console.error("L'élément .gallery est introuvable dans le DOM.");
}
