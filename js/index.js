// Pour afficher tous les articles disponibles à la vente :
const displayCameras = async () => {
  try {
    // Pour envoyer une requête HTTP de type GET au service web afin de récupérer les données :
    const response = await fetch("http://localhost:3000/api/cameras");
    const data = await response.json();

    // Pour ajouter les articles au DOM :
    const camerasList = document.querySelector(".cameralist");
    data.forEach((camera) => {
      const cameraArticle = document.createElement("article");
      cameraArticle.classList.add(
        "border",
        "border-5",
        "border-primary",
        "gap"
      );
      cameraArticle.innerHTML = `<a href="item.html?id=${camera._id}">
                                   <img
                                    src="${camera.imageUrl}"
                                    alt="Caméra vintage ${camera.name}."
                                   />
                                   <div class="d-flex justify-content-between bg-primary p-2">
                                     <h3>
                                     ${camera.name}
                                     </h3>
                                     <p>
                                     ${camera.price / 100} €
                                     </p>
                                   </div>
                                 </a>`;
      camerasList.append(cameraArticle);
    });
  } catch (error) {
    console.log(error); // Bloc exécuté si une erreur survient lors de la requête
  }
};

// Appel de la fonction :
displayCameras();
