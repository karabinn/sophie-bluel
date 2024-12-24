// Etape 3
// Suppression du tableau works car les éléments sont récupérés via fetch

// Ajout de la fonction insertWorkHtml avec ses propriétés
  function insertWorkHtml(imageUrl, legend, alt) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
  
    img.src = imageUrl;
    img.alt = alt;
    figcaption.textContent = legend;

// Ajout des éléments img et figcaption comme enfants de figure
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
  
//Suppression de la boucle forEach

// Etape 4
// URL de l'API
  const apiUrl = "http://localhost:5678/api/works";
  
// Appel à l'API pour récupérer les données avec fetch
  fetch(apiUrl)
    .then(response => {
      return response.json();
    })
    .then(works => {
      // Parcours des données récupérées
      works.forEach(work => {
        // Appel de la fonction pour chaque élément
        insertWorkHtml(work.imageUrl, work.title, work.title);
      });
    })
    .catch(error => {
      console.error("Erreur :", error);
    });