const cartTable = document.getElementById("cart-table"); // Pour accéder au <table> qui affichera les produits du panier
const getCart = localStorage.getItem("products"); // Pour accéder à la clé "products" du localStorage
let totalPrice = 0; // Pour stocker le prix total du panier

// Affichage des produits dans le panier :
const displayCart = async () => {
  if (getCart == null) {
    // Si la clé "products" du local Storage n'a pas de valeur :
    const cartTableRow = document.createElement("tr");
    cartTableRow.innerHTML = `<td colspan="2" class="text-center p-3">Aucun produit.</td>`;
    cartTable.append(cartTableRow);
  } else {
    let cart = JSON.parse(getCart); // Pour convertir le JSON en objet JS et stocker les données dans "cart"
    // Pour exécuter la fonction sur chaque élément du tableau (affichage du nom et du prix de la caméra) :
    const items = await Promise.all(
      cart.map((item) => {
        return fetch(`http://localhost:3000/api/cameras/${item}`)
          .then((response) => response.json())
          .catch((error) => alert(error));
      })
    );
    items.forEach((itemInfo) => {
      const cartTableRow = document.createElement("tbody");
      cartTableRow.innerHTML = `<tr>
                                <td class="px-3 py-2">${itemInfo.name}</td>
                                <td class="px-3 py-2 right">
                                  ${itemInfo.price / 100} €
                                </td>
                              </tr>`;
      cartTable.append(cartTableRow);
      totalPrice += itemInfo.price; // Pour additionner les prix des produits du panier
      localStorage.setItem("totalprice", totalPrice); // Pour stocker le prix total dans le localStorage
    });
    // Pour afficher le prix total en bas du panier :
    const getTotalPrice = localStorage.getItem("totalprice");
    const totalPriceRow = document.createElement("tfoot");
    totalPriceRow.innerHTML = `<td colspan="2" class="right px-3 py-2">
                                <strong>
                                  Total : ${getTotalPrice / 100} €
                                </strong>
                             </td>`;
    cartTable.append(totalPriceRow);
  }
};

// Pour vider le panier :
emptyCart = () => {
  localStorage.clear("products");
  location.reload();
};

// Fonction exécutée au clic de souris sur le bouton "Vider le panier" :
const emptyCartButton = document.getElementById("empty-cart");
document.getElementById("empty-cart").addEventListener("click", emptyCart);

// Pour vérifier que le panier n'est pas vide et que les champs du formulaire sont correctement saisis :
const checkValidity = () => {
  const lastName = document.getElementById("lastName");
  const firstName = document.getElementById("firstName");
  const email = document.getElementById("email");
  const address = document.getElementById("address");
  const city = document.getElementById("city");

  if (getCart == null) {
    alert("Merci d'ajouter au moins un article à votre panier.");
  } else if (lastName.value == "") {
    alert("Merci de renseigner votre nom.");
  } else if (firstName.value == "") {
    alert("Merci de renseigner votre prénom.");
  } else if (email.value == "") {
    alert("Merci de renseigner votre e-mail.");
  } else if (email.validity.typeMismatch) {
    alert("Merci de renseigner un e-mail valide.");
  } else if (address.value == "") {
    alert("Merci de renseigner votre adresse.");
  } else if (city.value == "") {
    alert("Merci de renseigner votre ville.");
  }
};

// Pour envoyer les données de la commande et du formulaire au back-end :
const placeAnOrder = () => {
  const orderButton = document.getElementById("order");
  orderButton.addEventListener("click", async (event) => {
    checkValidity(); // Appel de la fonction pour vérifier la validité
    let data = {
      // Pour récupérer les données entrées par l'utilisateur dans le formulaire :
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      // Pour récupérer les produits du panier stockés dans le localStorage :
      products: JSON.parse(getCart),
    };
    try {
      const response = await fetch("http://localhost:3000/api/cameras/order", {
        method: "POST", // Pour envoyer une requête HTTP de type POST au service web afin d'envoyer des données
        headers: { "Content-type": "application/json" }, // Indique le type de contenu envoyé (JSON)
        body: JSON.stringify(data), // Pour convertir la valeur de "data" (contact + products) en chaîne JSON
      });
      const order = await response.json();
      // Pour stocker l'identifiant de commande reçu, le nom et le prénom dans le localStorage :
      localStorage.setItem("orderid", order.orderId);
      localStorage.setItem("firstname", order.contact.firstName);
      localStorage.setItem("lastname", order.contact.lastName);
      // Pour afficher la page de confirmation de commande :
      window.location.href = "notification.html";
    } catch (err) {
      console.log(err);
    }
  });
};

// Appel des fonctions
displayCart();
placeAnOrder();
