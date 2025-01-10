document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("authToken");
  const titreProjets = document.getElementById("mes-projets-titre");

  if (token && titreProjets) {
    // Créer le bouton "Modifier Projets"
    const boutonModifierProjets = document.createElement("button");
    boutonModifierProjets.className = "btn-modifier-projets";

    // Ajouter l'icône Font Awesome
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-pen-to-square";
    icon.style.marginRight = "8px"; // Espace entre l'icône et le texte

    // Ajouter le texte "Modifier Projets"
    const texte = document.createTextNode("modifier");

    // Assembler l'icône et le texte dans le bouton
    boutonModifierProjets.appendChild(icon);
    boutonModifierProjets.appendChild(texte);

    // Ajouter le bouton à côté du titre "Mes Projets"
    titreProjets.appendChild(boutonModifierProjets);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".modal");
  const closeButton = document.querySelector(".close-button");
  const addPhotoButton = document.querySelector(".add-photo-button");
  const photosContainer = document.querySelector(".photos-container");

  // Afficher la modale
  function afficherModal() {
    modal.classList.remove("hidden");
  }

  // Fermer la modale
  function fermerModal() {
    modal.classList.add("hidden");
  }

  // Ajouter dynamiquement des images grâce à l'appel fetch
  function afficherPhotos() {
    fetch("http://localhost:5678/api/works")
      .then((response) => response.json())
      .then((data) => {
        photosContainer.innerHTML = ""; // Réinitialise le container
        data.forEach((projet) => {
          const img = document.createElement("img");
          img.src = projet.imageUrl;
          photosContainer.appendChild(img);
          const trashIcon = document.createElement("i");
          trashIcon.className = "fas fa-trash-alt";
          trashIcon.addEventListener("click", (e) => {
            if (confirm("Êtes-vous sûr de vouloir supprimer cette photo ?")) {
              const imgContainer = e.target.parentNode;
              imgContainer.remove();
            }
          });
          const imgContainer = document.createElement("div");
          imgContainer.style.position = "relative";
          imgContainer.appendChild(img);
          imgContainer.appendChild(trashIcon);
          photosContainer.appendChild(imgContainer);
        });
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des images :", error);
      });
  }

  addPhotoButton.addEventListener("click", () => {
    const addPhotoContainer = document.createElement("div");
    const test = document.createElement("button");
    test.innerHTML= 'toto';
    test.addEventListener("click", () => {
        afficherPhotos();
    })
    addPhotoContainer.appendChild(test);

    // addPhotoContainer.innerHTML = `
    //     //   <h2>Ajout photo</h2>
    //     //   <button class="return-button">&larr;</button>
    //     //   <input type="file" id="photoFile" accept="image/png, image/jpeg" max=4 Mo>
    //     //   <form id=formInfosPhoto>
    //     //     <label for="title">Titre :</label>
    //     //     <input type="text" id="title" name="title">
    //     //     <label for="category">Catégorie :</label>
    //     //     <select id="category" name="category">
    //     //       <option value="categorie1">Objets</option>
    //     //       <option value="categorie2">Appartements</option>
    //     //       <option value="categorie3">Hôtels & restaurants</option>
    //     //     </select>
    //     //     <button id="validerButton">Valider</button>
    //     //   </form>
    //     // `;
     const modalContent = document.querySelector(".modal-content");
     modalContent.innerHTML = "";
     modalContent.appendChild(addPhotoContainer);

    // const returnButton = addPhotoContainer.querySelector(".return-button");
    // returnButton.addEventListener("click", () => {
    //   afficherPhotos();
    // });
    // const modal = document.querySelector(".addPhotoContainer");
    //   modal.addEventListener("click", (e) => {
    //     if (e.target === modal) fermerModal();
    //   });
  });
  
  //Ajouter les événements

  closeButton.addEventListener("click", fermerModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) afficherPhotos();
  });

  const boutonModifierProjets = document.querySelector(".btn-modifier-projets");
  boutonModifierProjets.addEventListener("click", () => {
    afficherPhotos();
    afficherModal();
  });
});
