// Déclaration de constantes globales :
const cartTable = document.getElementById("cart-table"); // Pour accéder au <table> qui affichera les produits du panier
const getCart = localStorage.getItem("products"); // Pour accéder à la clé "products" du Local Storage
const cart = JSON.parse(getCart); // Pour convertir le JSON en objet JS
const cartIsEmpty = getCart == null; // Panier vide

// Affichage des produits dans le panier :
const displayCart = () => {
  if (cartIsEmpty) {
    const cartTableRow = document.createElement("tr");
    cartTableRow.innerHTML = `<td colspan="2" class="text-center p-3">Aucun produit.</td>`;
    cartTable.append(cartTableRow);
  } else {
    cart.forEach((item) => {
      const cartTableRow = document.createElement("tbody");
      cartTableRow.innerHTML = `<tr>
                                  <td class="px-3 py-2">${item.itemName} <br/>
                                  <span id="small">(Quantité : ${item.quantity})</span></td>
                                  <td class="px-3 py-2 right">
                                    ${item.price} €
                                  </td>
                                </tr>`;
      cartTable.append(cartTableRow);
    });
  }
};

// Pour additionner les prix des produits du panier :
const calculateTotalPrice = () => {
  if (!cartIsEmpty) {
    let totalPrice = 0;
    cart.forEach((item) => {
      let itemPrice = item.price;
      totalPrice += itemPrice;
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
        localStorage.clear("products");
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

  if (cartIsEmpty) {
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

// Pour stocker les id des produits du panier dans le Local Storage :
const getIds = () => {
  if (!cartIsEmpty) {
    let ids = [];
    cart.forEach((item) => {
      let quantity = item.quantity;
      for (i = 1; i <= quantity; i++) {
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
    let data = {
      // Pour récupérer les données entrées par l'utilisateur dans le formulaire :
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      // Pour récupérer les produits du panier stockés dans le Local Storage :
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
