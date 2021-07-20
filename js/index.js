// Pour envoyer une requête HTTP de type GET au service web afin de récupérer les données :
fetch("http://localhost:3000/api/cameras")
  .then((response) => response.json()) // Fonction appelée pour convertir le résultat de la requête au format JSON
  .then((cameras) => showCameras(cameras)) // Pour récupérer le contenu de la réponse
  .catch((error) => alert(error)); // Fonction appelée si une erreur survient lors de la requête

// Pour afficher tous les articles disponibles à la vente :
const showCameras = (cameras) => {
  const camerasList = document.querySelector(".cameralist");
  // Pour exécuter la fonction sur chaque élément du tableau (création d'un <article> pour chaque caméra) :
  cameras.forEach((camera) => {
    const cameraArticle = document.createElement("article");
    cameraArticle.classList.add("border", "border-5", "border-primary", "gap");
    // Pour insérer dynamiquement le contenu de l'article (image,  nom et  prix de la caméra) :
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
    // Pour insérer l'article en tant que dernier enfant du parent <div> :
    camerasList.append(cameraArticle);
  });
};
