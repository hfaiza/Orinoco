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

placeAnOrder = () => {
  let formData = new FormData();
  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        address: formData.get("address"),
        city: formData.get("city"),
      },
      products: JSON.parse(getCart),
    }),
  });
  // localStorage.clear("products");
};

// .then((response) => response.json())
// .then((cameras) => showCameras(cameras))
// .catch((error) => alert(error));

const orderButton = document.getElementById("order");
orderButton.addEventListener("click", placeAnOrder);
