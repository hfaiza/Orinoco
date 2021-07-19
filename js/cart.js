const cartTable = document.getElementById("cart-table"); // Pour accéder au <table> qui affichera les produits du panier
const getCart = localStorage.getItem("products"); // Pour accéder à la clé "products" du local Storage
let totalPrice = 0; // Pour stocker le prix total du panier

// Affichage des produits dans le panier :
if (getCart == null) {
  // Si la clé "products" du local Storage n'a pas de valeur :
  const cartTableRow = document.createElement("tr");
  cartTableRow.innerHTML = `<td colspan="2" class="text-center p-3">Aucun produit.</td>`;
  cartTable.append(cartTableRow);
} else {
  let cart = JSON.parse(getCart); // Pour convertir le JSON en objet JS et stocker les données dans "cart"
  // Pour exécuter la fonction sur chaque élément du tableau (affichage du nom et du prix de la caméra) :
  cart.forEach((item) => {
    fetch(`http://localhost:3000/api/cameras/${item}`)
      .then((response) => response.json())
      .then((itemInfo) => {
        const cartTableRow = document.createElement("tbody");
        cartTableRow.innerHTML = `<tr>
                                    <td class="px-3 py-2">${itemInfo.name}</td>
                                    <td class="px-3 py-2 right">
                                      ${itemInfo.price / 100} €
                                    </td>
                                  </tr>`;
        cartTable.append(cartTableRow);
        totalPrice += itemInfo.price;
        localStorage.setItem("totalprice", totalPrice);
      })
      .catch((error) => alert(error));
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

// Pour vider le panier :
emptyCart = () => {
  localStorage.clear("products");
  location.reload();
};

const emptyCartButton = document.getElementById("empty-cart");
emptyCartButton.addEventListener("click", emptyCart);
/* On utilise la méthode addEventListener() pour surveiller les clics de souris sur le bouton 
"Vider le panier", qui appelle la fonction stockée dans la variable emptyCart : */

// Pour envoyer les données de la commande et du formulaire de contact au back-end :

const form = document.getElementById("form");
const orderButton = document.getElementById("order");
orderButton.addEventListener("click", (event) => {
  // Pour vérifier que le panier n'est pas vide et que les champs du formulaire sont correctement saisis :
  if (getCart !== null && form.reportValidity()) {
    let data = {
      // Pour récupérer les données entrées par l'utilisateur :
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

    fetch("http://localhost:3000/api/cameras/order", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((orderInfo) => {
        // Pour stocker l'identifiant de commande, le nom et prénom dans le localStorage :
        localStorage.setItem("orderid", orderInfo.orderId);
        localStorage.setItem("firstname", orderInfo.contact.firstName);
        localStorage.setItem("lastname", orderInfo.contact.lastName);
      })
      .catch((err) => console.log(err));
    // Pour afficher la page de confirmation de commande :
    window.location.href = "notification.html";
  } else {
    alert(
      "Merci de renseigner correctement tous les champs du formulaire et de vérifier que votre panier n'est pas vide."
    );
  }
});
