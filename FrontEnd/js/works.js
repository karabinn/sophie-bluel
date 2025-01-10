
let works = []; // Variable globale pour stocker les œuvres

// Fonction pour insérer une œuvre dans la galerie
function insertWorkHtml(imageUrl, legend, alt) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = imageUrl;
    img.alt = alt;
    figcaption.textContent = legend;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    const gallery = document.querySelector(".gallery");
    if (gallery) {
        gallery.appendChild(figure);
    } else {
        console.error("L'élément .gallery est introuvable dans le DOM.");
    }
}

// Fonction pour récupérer les œuvres depuis l'API
async function getWorks() {
    const apiUrl = "http://localhost:5678/api/works";
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des œuvres");
        }
        works = await response.json(); // Met à jour la variable globale
    } catch (error) {
        console.error("Erreur :", error);
    }
}

// Fonction pour afficher toutes les œuvres
function afficherToutesLesOeuvres() {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; // Vider la galerie
    works.forEach(work => {
        insertWorkHtml(work.imageUrl, work.title, work.title);
    });
}

// Fonction pour filtrer les œuvres par catégorie
function filtrerOeuvresParCategorie(category) {
    const worksFiltres = works.filter(work => work.category.name === category);
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; // Vider la galerie
    worksFiltres.forEach(work => {
        insertWorkHtml(work.imageUrl, work.title, work.title);
    });
}

// Fonction principale pour charger les œuvres et afficher toutes les œuvres
async function chargerEtAfficherWorks() {
    await getWorks(); // Récupère les œuvres
    afficherToutesLesOeuvres(); // Affiche toutes les œuvres
}

// Fonction pour récupérer les catégories depuis l'API
function getCategories() {
    const apiUrl = "http://localhost:5678/api/categories"; // URL de l'API pour récupérer les catégories

    fetch(apiUrl)
        .then(response => response.json())
        .then(categories => {
            // Appel de la fonction pour ajouter le bouton "Tous"
            ajouterBoutonTous();

            // Pour chaque catégorie, créer un bouton
            categories.forEach(category => {
                createCategoryButton(category);
            });
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des catégories :", error);
        });
}

// Fonction pour ajouter un bouton "Tous"
function ajouterBoutonTous() {
    const filtres = document.querySelector(".filtres");

    const boutonTous = document.createElement("button");
    boutonTous.textContent = "Tous";
    // boutonTous.classList.add("active");
   
    boutonTous.setAttribute("data-id", "0"); // Data-id à 0 pour le bouton "Tous"

    // Ajouter un événement au clic pour afficher toutes les œuvres
    boutonTous.addEventListener("click", () => {
        filtrerOeuvresParCategorie(0); // Filtrer avec id 0 (toutes les catégories)
    });

    filtres.appendChild(boutonTous); // Ajouter le bouton "Tous" dans la div
    boutonTous.click();
}

// Fonction pour créer un bouton pour chaque catégorie
function createCategoryButton(category) {
    const filtres = document.querySelector(".filtres");

    const button = document.createElement("button");
    button.textContent = category.name; // Libellé du bouton
    button.setAttribute("data-id", category.id); // Ajouter l'ID de la catégorie comme data-id

    // Ajouter un gestionnaire d'événements pour chaque bouton
    button.addEventListener("click", () => {
        filtrerOeuvresParCategorie(category.id); // Appel à la fonction filtrerOeuvresParCategorie avec l'ID de la catégorie
    });

    filtres.appendChild(button); // Ajouter le bouton à la div des filtres
}

// Fonction pour filtrer les œuvres par catégorie
function filtrerOeuvresParCategorie(categoryId) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; // Vider la galerie

    // Appeler l'API pour récupérer les œuvres
    const apiUrl = "http://localhost:5678/api/works";
    fetch(apiUrl)
        .then(response => response.json())
        .then(works => {
            const filteredWorks = categoryId === 0 
                ? works // Si categoryId est 0, on montre toutes les œuvres
                : works.filter(work => work.category.id === categoryId); // Sinon, on filtre par catégorie

            // Ajouter les œuvres filtrées à la galerie
            filteredWorks.forEach(work => {
                insertWorkHtml(work.imageUrl, work.title, work.title);
            });
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des œuvres :", error);
        });
}

// Fonction pour insérer une œuvre dans la galerie
function insertWorkHtml(imageUrl, legend, alt) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = imageUrl;
    img.alt = alt;
    figcaption.textContent = legend;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    const gallery = document.querySelector(".gallery");
    gallery.appendChild(figure);
}

// Appeler la fonction getCategories pour récupérer et afficher les catégories
