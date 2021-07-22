const queryString = new URLSearchParams(window.location.search); // Pour récupérer la partie de l'URL qui suit le "?" (symbole inclus)
const id = queryString.get("id"); // Retourne la première valeur associée au paramètre de recherche "id"

// Pour envoyer une requête HTTP de type GET au service web afin de récupérer les données :
fetch(`http://localhost:3000/api/cameras/${id}`) // Renvoie l'élément correspondant à l'identifiant
  .then((response) => response.json()) // Fonction appelée pour convertir le résultat de la requête au format JSON
  .then((oneCamera) => {
    // Pour récupérer le contenu de la réponse :
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
                          class="solo-item border border-5 border-primary mt-5 mb-2"
                         />
                         <div>
                          <h1 id="name">${oneCamera.name}</h1>
                          <p>${oneCamera.description}</p>
                          <p>Prix :
                            <span id="price">
                              ${oneCamera.price / 100}
                            </span> €
                          </p>
                          <p>
                            <label for="lenses">Objectif :</label>
                            <select id="lenses">
                              <option>Choisir une option</option>
                            </select>
                          </p>
                          <p>
                            <label for="quantity">Quantité :</label>
                            <select id="quantity">
                             <option>1</option>
                             <option>2</option>
                             <option>3</option>
                            </select>
                          </p>
                         </div>`;
  product.append(cameraDiv);
};

// Affichage des options de personnalisation dans le menu déroulant :
const showLenses = (oneCamera) => {
  const lensesArray = oneCamera.lenses; // Pour accéder à l'array "lenses"
  const optionsList = document.getElementById("lenses");
  // Pour exécuter la fonction sur chaque élément du tableau (création d'une <option> pour chaque lentille) :
  lensesArray.forEach((lense) => {
    const option = document.createElement("option");
    option.innerHTML = `${lense}`;
    optionsList.append(option);
  });
};

// Déclaration d'une classe qui sera utilisée pour stocker les informations du produit dans le Local Storage :
class Item {
  constructor(id, itemName, price, quantity) {
    this.id = id;
    this.itemName = itemName;
    this.price = price;
    this.quantity = quantity;
  }
}

// Pour ajouter le produit au panier :
const addToCart = () => {
  const button = document.getElementById("button");
  button.addEventListener("click", () => {
    // Pour vérifier qu'un objectif a bien été sélectionné avant l'ajout du produit au panier :
    if (document.getElementById("lenses").selectedIndex == 0) {
      alert(
        "Merci de choisir un objectif avant d'ajouter la caméra à votre panier."
      );
    } else {
      let cart = []; // Déclaration d'une variable qui stockera les produits du panier dans un array

      // Pour récupérer les valeurs à stocker :
      let quantity = document.getElementById("quantity").value;
      let itemName = document.getElementById("name").textContent;
      let price = document.getElementById("price").textContent * quantity;

      // Pour récupérer la valeur associée à la clé "products" dans le localStorage :
      if (localStorage.getItem("products")) {
        cart = JSON.parse(localStorage.getItem("products")); // Pour convertir le JSON en objet JS et stocker les données dans "cart"
      }
      let item = new Item(id, itemName, price, quantity);
      cart.push(item); // Pour ajouter l'id du produit à la fin de l'array "cart"
      localStorage.setItem("products", JSON.stringify(cart)); // Pour accéder à l'objet local Storage et lui ajouter une entrée
      // On transforme le tableau "cart" en chaîne de caractères car les clés et valeurs du localStorage sont toujours des chaînes de caractères

      // Pour afficher un message de validation :
      alert("Produit ajouté au panier !");
    }
  });
};

// Appel des fonctions
addToCart(); // exécutée au clic de souris sur le bouton "Ajouter au panier"
