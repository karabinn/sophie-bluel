//Etape 2
// Définition de la fonction insertWorkHtml
function insertWorkHtml(imageUrl, legend, alt) {
    // Création des éléments nécessaires
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
  
    // Configuration des attributs et du contenu
    img.src = imageUrl;    // URL dynamique
    img.alt = alt;         // Texte alternatif dynamique
    figcaption.textContent = legend; // Légende dynamique
  
    // Assemblage de la figure
    figure.appendChild(img);
    figure.appendChild(figcaption);
  
    // Récupération de l'élément parent où insérer la figure
    const gallery = document.querySelector(".gallery");
  
    // Ajout de la figure dans la galerie si l'élément existe, sinon msg d'erreur
    if (gallery) {
      gallery.appendChild(figure);
    } else {
      console.error("L'élément .gallery est introuvable dans le DOM.");
    }
  }
  
  // Test de la fonction
  insertWorkHtml(
    "http://localhost:5678/images/abajour-tahina1651286843956.png", 
    "Abat jour Etape 2", 
    "Abat jour Etape 2",
  );