const queryString = new URLSearchParams(window.location.search); // Pour récupérer la partie de l'URL qui suit le "?" (symbole inclus)
const id = queryString.get("id"); // Retourne la première valeur associée au paramètre de recherche "id"

fetch("http://localhost:3000/api/cameras/" + id) // Renvoie l'élément correspondant à l'identifiant given_id
  .then((response) => response.json()) // Fonction appelée pour récupérer résultat de la requête au format JSON
  .then((oneCamera) => {
    // Pour récupérer vraie valeur de la fonction précédente
    showCamera(oneCamera);
    showLenses(oneCamera);
  })
  .catch((error) => alert(error)); // Fonction appelée si une erreur survient lors de la requête

showCamera = (oneCamera) => {
  const product = document.querySelector(".item");
  const cameraDiv = document.createElement("div");
  cameraDiv.classList.add("bg-secondary");
  cameraDiv.innerHTML = `<img
                          src="${oneCamera.imageUrl}"
                          alt="Caméra vintage ${oneCamera.name}."
                          class="solo-item border border-5 border-primary mt-5 mb-2" />
                          <div class="">
                            <h1>${oneCamera.name}</h1>
                            <p>${oneCamera.description}</p>
                            <p>Prix : ${oneCamera.price / 100} €</p>
                            <p>
                              <label for="lenses">Objectif :</label>
                              <select id="lenses">
                                <option>Choisir une option</option>
                              </select>
                            </p>
                            <button>Ajouter au panier</button>
                          </div>`;
  product.append(cameraDiv);
};

showLenses = (oneCamera) => {
  let lensesArray = oneCamera.lenses; // Pour accéder à l'array "lenses"
  // Tant que l'index est inférieur au nombre d'éléments de l'array "lenses", implémenter l'index :
  for (let i = 0; i < lensesArray.length; i++) {
    const optionsList = document.getElementById("lenses");
    const option = document.createElement("option");
    // Ajout d'une nouvelle <option> pour chaque élément présent dans l'array :
    option.innerHTML = `${lensesArray[i]}`;
    optionsList.append(option);
  }
};
