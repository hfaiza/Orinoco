// Déclaration de constantes globales :
const cartTable = document.getElementById("cart-table"); // Pour accéder au <table> qui affichera les produits du panier
const cart = JSON.parse(localStorage.getItem("products")); // Pour accéder à la clé "products" du Local Storage et convertir le JSON en objet JS
const cartIsEmpty = cart == null; // Panier vide

// Affichage des produits dans le panier :
const displayCart = () => {
  if (cartIsEmpty) {
    const cartTableRow = document.createElement("tr");
    cartTableRow.innerHTML = `<td colspan="2" class="text-center p-3">Aucun produit.</td>`;
    cartTable.append(cartTableRow);
  } else {
    cart.forEach((item) => {
      const cartTableRow = document.createElement("tr");
      cartTableRow.innerHTML = `<td class="px-3 py-2">
                                  ${item.itemName} <br/>
                                  <span id="small">(Quantité : ${item.itemQuantity})</span>
                                </td>
                                <td class="px-3 py-2 right">
                                  ${item.itemPrice} €
                                </td>`;
      cartTable.append(cartTableRow);
    });
  }
};

// Pour additionner les prix des produits du panier :
const calculateTotalPrice = () => {
  if (!cartIsEmpty) {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.itemPrice;
    });
    const totalPriceRow = document.createElement("tfoot");
    totalPriceRow.innerHTML = `<td colspan="2" class="right px-3 py-2">
                                <strong>
                                  Total : ${totalPrice} €
                                </strong>
                               </td>`;
    cartTable.append(totalPriceRow);
    localStorage.setItem("totalprice", totalPrice); // Pour stocker le prix total dans le Local Storage
  }
};

// Pour vider le panier :
const emptyCart = () => {
  if (!cartIsEmpty) {
    document.getElementById("empty-cart").addEventListener("click", () => {
      if (
        confirm(
          "Voulez-vous vider votre panier ? Cette action est irréversible."
        )
      ) {
        localStorage.clear();
        location.reload();
      }
    });
  }
};

// Pour vérifier que le panier n'est pas vide et que les champs du formulaire sont correctement saisis :
const checkValidity = () => {
  const lastName = document.getElementById("lastName");
  const firstName = document.getElementById("firstName");
  const email = document.getElementById("email");
  const address = document.getElementById("address");
  const city = document.getElementById("city");

  // Affichage de messages d'erreur si les conditions ne sont pas remplies :
  let errorMessage = "";

  if (cartIsEmpty) {
    errorMessage += "Merci d'ajouter au moins un article à votre panier. \n";
  }
  if (lastName.value.trim() == "") {
    errorMessage += "Merci de renseigner votre nom. \n";
  }
  if (firstName.value.trim() == "") {
    errorMessage += "Merci de renseigner votre prénom. \n";
  }
  if (email.value.trim() == "") {
    errorMessage += "Merci de renseigner votre e-mail. \n";
  }
  if (email.validity.typeMismatch) {
    errorMessage += "Merci de renseigner un e-mail valide. \n";
  }
  if (address.value.trim() == "") {
    errorMessage += "Merci de renseigner votre adresse. \n";
  }
  if (city.value.trim() == "") {
    errorMessage += "Merci de renseigner votre ville.";
  }
  if (errorMessage) {
    alert(errorMessage);
    preventDefault();
  }
};

// Pour stocker les id des produits du panier dans le Local Storage :
const getIds = () => {
  if (!cartIsEmpty) {
    let ids = [];
    cart.forEach((item) => {
      for (i = 1; i <= item.itemQuantity; i++) {
        ids.push(item.id);
      }
    });
    localStorage.setItem("id", JSON.stringify(ids));
  }
};

// Pour envoyer les données de la commande et du formulaire au back-end :
const placeAnOrder = () => {
  const orderButton = document.getElementById("order");
  orderButton.addEventListener("click", async () => {
    checkValidity(); // Appel de la fonction pour vérifier la validité

    /* Pour récupérer les données entrées par l'utilisateur dans le formulaire 
    et les produits du panier stockés dans le Local Storage : */
    let data = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      products: JSON.parse(localStorage.getItem("id")),
    };

    try {
      // Pour envoyer une requête HTTP de type POST au service web afin d'envoyer des données :
      const response = await fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const order = await response.json();

      // Pour stocker l'identifiant de commande reçu, le nom et le prénom dans le Local Storage :
      localStorage.setItem("orderid", order.orderId);
      localStorage.setItem("firstname", order.contact.firstName);
      localStorage.setItem("lastname", order.contact.lastName);

      // Pour afficher la page de confirmation de commande :
      window.location.href = "notification.html";
    } catch (error) {
      console.log(error); // Bloc exécuté si une erreur survient lors de la requête
    }
  });
};

// Appel des fonctions :
displayCart();
calculateTotalPrice();
emptyCart(); // exécutée au clic de souris sur le bouton "Vider le panier"
getIds();
placeAnOrder(); // qui exécute elle-même la fonction checkValidity()
