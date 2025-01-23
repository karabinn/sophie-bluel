document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("authToken");
  console.log(token);

  if (token) {
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

      boutonModifierProjets.addEventListener("click", () => {
        afficherPhotos();
        afficherModal();
      });

      if (boutonModifierProjets) {
        boutonModifierProjets.addEventListener("click", () => {
          afficherPhotos();
          afficherModal();
        });
      }
    }
  }
});

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

// Afficher la modale
function afficherModal() {
  modal.classList.remove("hidden");
}
// Fermer la modale
function fermerModal() {
  modal.classList.add("hidden");
}

function createButton(classButton, text) {
  const button = document.createElement("button");
  button.classList.add(classButton);
  button.innerHTML = text;
  return button;
}
function createTitle(text) {
  const titreFormulaire = document.createElement("h2");
  titreFormulaire.innerHTML = text;
  return titreFormulaire;
}
function supprimerImage(imageId) {
  const confirmation = confirm(
    "Êtes-vous sûr de vouloir supprimer cette photo ?"
  );
  if (!confirmation) return;

  fetch(`http://localhost:5678/api/works/${imageId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Supprimer l'image de la modale
        const imageInModal = document.querySelector(
          `img[data-id="${imageId}"]`
        );
        if (imageInModal) {
          const imgContainer = imageInModal.parentElement;
          imgContainer.remove();
        }

        // Supprimer l'image de la galerie
        const imageInGallery = document.querySelector(
          `.gallery img[data-id="${imageId}"]`
        );
        if (imageInGallery) {
          const figureContainer = imageInGallery.parentElement;
          figureContainer.remove();
        }
        console.log("Image supprimée avec succès !");
        location.reload();
      } else {
        console.error("Erreur lors de la suppression de l'image.");
      }
    })
    .catch((error) => {
      console.error("Erreur réseau :", error);
    });
}
// Ajouter dynamiquement des images grâce à l'appel fetch
function afficherPhotos() {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      modalContent.innerHTML = ""; // Réinitialise le container
      const buttonClose = createButton("close-button", "&times;");
      buttonClose.addEventListener("click", fermerModal);
      modalContent.appendChild(buttonClose);

      const titreModal = createTitle("Galerie photo");
      modalContent.appendChild(titreModal);

      const photosContainer = document.createElement("div");
      photosContainer.classList.add("photos-container");

      data.forEach((projet) => {
        const img = document.createElement("img");
        img.src = projet.imageUrl;
        img.setAttribute("data-id", projet.id);
        photosContainer.appendChild(img);
        const trashIcon = document.createElement("i");
        trashIcon.className = "fas fa-trash-alt";

        trashIcon.addEventListener("click", () => supprimerImage(projet.id));

        const imgContainer = document.createElement("div");
        imgContainer.style.position = "relative";
        imgContainer.appendChild(img);
        imgContainer.appendChild(trashIcon);
        photosContainer.appendChild(imgContainer);
      });

      modalContent.appendChild(photosContainer);

      const hrModal = document.createElement("hr");
      modalContent.appendChild(hrModal);

      const buttonAjoutPhoto = createButton(
        "add-photo-button",
        "Ajouter une photo"
      );
      buttonAjoutPhoto.addEventListener("click", () => {
        afficherFormAjout();
      });
      modalContent.appendChild(buttonAjoutPhoto);
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des images :", error);
    });
}

function afficherFormAjout() {
  modalContent.innerHTML = "";

  const titreModal = createTitle("Ajout photo");
  modalContent.appendChild(titreModal);

  //Bouton Retour
  const buttonReturn = createButton("return-button", "&larr;");
  buttonReturn.addEventListener("click", afficherPhotos);

  //Bouton Fremer
  const buttonClose = createButton("close-button", "&times;");
  buttonClose.addEventListener("click", fermerModal);

  //Formulaire HTML
  modalContent.innerHTML += `
      <form id="formInfosPhoto" class="form-ajout-photo">
      <div class="encadré-upload">
      <div class="image-upload-container">
           <input type="file" id="file" accept="image/png, image/jpeg" hidden>
          <div class="img-area">
            <i class='bx bx-image'></i>
            <button class="select-image">+ Ajouter photo</button>
            <p>jpg, png : 4mo max</p>
          </div>
      </div>
      </div>
  <label for="title">Titre :</label>
  <input type="text" id="title" name="title" required>
  <label for="category">Catégorie :</label>
  <select id="category" name="category" required>
    <option value="" disabled selected></option>
    <option value="1">Objets</option>
    <option value="2">Appartements</option>
    <option value="3">Hôtels & restaurants</option>
  </select>
  <hr>
  <button type="submit" id="validerButton">Valider</button>
</form>
    `;

  //Ajout des boutons return + close ici car sinon bug
  modalContent.appendChild(buttonReturn);
  modalContent.appendChild(buttonClose);

  const validerButton = document.getElementById("validerButton");
  validerButton.addEventListener("click", () => {
    fermerModal();
  });

  //Gestion de la soumission du form
  const form = document.getElementById("formInfosPhoto");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const photo = document.getElementById("file").files[0];

    if (!photo) {
      alert("Veuillez sélectionner une image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", photo);

    // Requête POST pour envoyer les données
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: formData,
    }).then((response) => {
      response
        .json()
        .then((newWork) => {
          alert("Image ajoutée avec succès !");
          ajouterImageGalerie(newWork);
          afficherPhotos();
          fermerModal();
        })
        .catch((error) => {
          console.error("Erreur :", error);
          alert("Impossible d'ajouter la photo.");
        });
    });
  });
  // Gestion de la prévisualisation d'image

  const selectImage = document.querySelector(".select-image");
  const inputFile = document.querySelector("#file");
  const imgArea = document.querySelector(".img-area");

  selectImage.addEventListener("click", function () {
    inputFile.click();
  });

  inputFile.addEventListener("change", function () {
    const image = this.files[0];
    console.log(image);
    const reader = new FileReader();
    reader.onload = () => {
      const imguRL = reader.result;
      const img = document.createElement("img");
      img.src = imguRL;
      imgArea.appendChild(img);

      const elementsToRemove = imgArea.querySelectorAll(
        ".bx, .select-image, p"
      );
      elementsToRemove.forEach((element) => {
        element.remove();
      });
    };
    reader.readAsDataURL(image);
  });
}

// Ajouter les événements pour fermer la modale

modal.addEventListener("click", (e) => {
  if (e.target === modal) fermerModal(); // Fermer la modale si l'utilisateur clique à l'extérieur
});

function ajouterImageGalerie(work) {
  // Sélectionne le conteneur de la galerie
  const galerie = document.querySelector(".gallery");

  // Crée l'élément HTML pour la nouvelle image
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = work.imageUrl; // URL de l'image
  img.alt = work.title; // Texte alternatif

  const caption = document.createElement("figcaption");
  caption.textContent = work.title;

  // Ajoute l'image et son titre à la figure
  figure.appendChild(img);
  figure.appendChild(caption);

  // Ajoute la figure au conteneur de la galerie
  galerie.appendChild(figure);
}
