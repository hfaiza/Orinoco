// Déclaration de constantes globales :
const queryString = new URLSearchParams(window.location.search); // Pour récupérer la partie de l'URL qui suit le "?" (symbole inclus)
const id = queryString.get("id"); // Retourne la première valeur associée au paramètre de recherche "id"

const getOneCamera = async () => {
  try {
    // Pour envoyer une requête HTTP de type GET au service web afin de récupérer les données :
    const response = await fetch(`http://localhost:3000/api/cameras/${id}`);
    const camera = await response.json();

    // Appel des fonctions :
    displayCamera(camera);
    displayLenses(camera);
  } catch (error) {
    console.log(error); // Bloc exécuté si une erreur survient lors de la requête
  }
};

// Affichage du produit (image, nom, description, prix, menus déroulants pour les options de personnalisation et la quantité) :
const displayCamera = (camera) => {
  const container = document.querySelector(".item");
  const cameraDiv = document.createElement("div");
  cameraDiv.innerHTML = `<img
                          src="${camera.imageUrl}"
                          alt="Caméra vintage ${camera.name}."
                          class="solo-item border border-5 border-primary mt-5 mb-2"
                         />
                         <div>
                          <h1 id="cameraName">${camera.name}</h1>
                          <p>${camera.description}</p>
                          <p>Prix :
                            <span id="price">
                              ${camera.price / 100}
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
  container.append(cameraDiv);
};

// Affichage des options de personnalisation dans le menu déroulant :
const displayLenses = (camera) => {
  const lensesArray = camera.lenses;
  const optionsList = document.getElementById("lenses");
  lensesArray.forEach((lens) => {
    const option = document.createElement("option");
    option.innerHTML = `${lens}`;
    optionsList.append(option);
  });
};

// Déclaration d'une classe qui sera utilisée pour créer des objets à stocker dans le Local Storage :
class Item {
  constructor(id, itemName, itemPrice, itemQuantity) {
    this.id = id;
    this.itemName = itemName;
    this.itemPrice = itemPrice;
    this.itemQuantity = itemQuantity;
  }
}

// Pour mettre à jour le panier :
const addToCart = () => {
  const addToCartButton = document.getElementById("add-to-cart");
  addToCartButton.addEventListener("click", () => {
    // Pour vérifier qu'un objectif a bien été sélectionné avant l'ajout du produit au panier :
    if (document.getElementById("lenses").selectedIndex == 0) {
      alert(
        "Merci de choisir un objectif avant d'ajouter la caméra à votre panier."
      );
    } else {
      let productsInCart = []; // Déclaration d'une variable qui stockera les produits du panier dans un array

      // Pour récupérer les valeurs à stocker dans le Local Storage :
      let itemQuantity = quantity.value;
      let itemName = cameraName.textContent;
      let itemPrice = price.textContent * itemQuantity;

      // Pour récupérer la valeur associée à la clé "products" dans le Local Storage :
      if (localStorage.getItem("productsInCart")) {
        productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
      }

      // Création d'un objet "produit" :
      let item = new Item(id, itemName, itemPrice, itemQuantity);

      // Si le produit n'est pas déjà dans le panier : ajout du produit à l'array cart, puis mise à jour du Local Storage :
      if (productsInCart.find((i) => i.id === id)) {
        alert("Vous avez déjà ajouté cet article à votre panier.");
      } else {
        productsInCart.push(item);
        localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
        alert("Produit ajouté au panier !");
      }
    }
  });
};

// Appel des fonctions
getOneCamera();
addToCart(); // exécutée au clic de souris sur le bouton "Ajouter au panier"
