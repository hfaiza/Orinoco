const queryString = new URLSearchParams(window.location.search); // Pour récupérer la partie de l'URL qui suit le "?" (symbole inclus)
const id = queryString.get("id"); // Retourne la première valeur associée au paramètre de recherche "id"

// Pour envoyer une requête HTTP de type GET au service web afin de récupérer les données :
fetch(`http://localhost:3000/api/cameras/${id}`) // Renvoie l'élément correspondant à l'identifiant given_id
  .then((response) => response.json()) // Fonction appelée pour récupérer résultat de la requête au format JSON
  .then((oneCamera) => {
    // Pour récupérer vraie valeur de la fonction précédente
    showCamera(oneCamera);
    showLenses(oneCamera);
  })
  .catch((error) => alert(error)); // Fonction appelée si une erreur survient lors de la requête

// Affichage du produit (image, nom, description, prix, menu déroulant pour les options de personnalisation) :
const showCamera = (oneCamera) => {
  const product = document.querySelector(".item");
  const cameraDiv = document.createElement("div");
  cameraDiv.innerHTML = `<img
                          src="${oneCamera.imageUrl}"
                          alt="Caméra vintage ${oneCamera.name}."
                          class="solo-item border border-5 border-primary mt-5 mb-2" />
                          <div>
                            <h1>${oneCamera.name}</h1>
                            <p>${oneCamera.description}</p>
                            <p>Prix : ${oneCamera.price / 100} €</p>
                            <p>
                              <label for="lenses">Objectif :</label>
                              <select id="lenses">
                                <option>Choisir une option</option>
                              </select>
                            </p>
                          </div>`;
  product.append(cameraDiv);
};

// Affichage des options de personnalisation dans le menu déroulant :
const showLenses = (oneCamera) => {
  let lensesArray = oneCamera.lenses; // Pour accéder à l'array "lenses"
  const optionsList = document.getElementById("lenses");
  lensesArray.forEach((lense) => {
    // Pour exécuter la fonction sur chaque élément du tableau (création d'un <option> pour chaque lentille)
    const option = document.createElement("option");
    option.innerHTML = `${lense}`;
    optionsList.append(option);
  });
};

// Ajout du produit au panier au clic sur le bouton :
addToCart = () => {
  let cart = []; // Déclaration d'une variable qui stockera les produits du panier dans un array
  if (localStorage.getItem("products")) {
    // Pour récupérer la valeur associée la clé "products"
    cart = JSON.parse(localStorage.getItem("products")); // Pour convertir le JSON en objet JS et stocker les données dans "cart"
  }
  cart.push(id); // Pour ajouter l'id du produit à la fin de l'array cart
  localStorage.setItem("products", JSON.stringify(cart)); // Pour accéder à l'objet local Storage et lui ajouter une entrée
  // On transforme le tableau "cart" en chaîne de caractères car les clés et valeurs du localStorage sont toujours des chaînes de caractères
  const itemPage = document.getElementById("product-content");
  const validationMessage = document.createElement("p");
  validationMessage.classList.add("bg-secondary", "m-auto", "pb-3");
  validationMessage.innerHTML = `Produit ajouté au panier !`; // Pour afficher un message de validation
  itemPage.append(validationMessage);
};

const button = document.getElementById("button");
button.addEventListener("click", addToCart);
/* On utilise la méthode addEventListener() pour surveiller les clics de souris sur le bouton 
"Ajouter au panier", qui appelle la fonction stockée dans la variable addToCart : */
