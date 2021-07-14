const cartTable = document.getElementById("cart-table");
const getCart = localStorage.getItem("products");

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
        const cartTableRow = document.createElement("tr");
        cartTableRow.innerHTML = `<tr>
                                    <td class="px-3">${itemInfo.name}</td>
                                    <td class="px-3 right">
                                      ${itemInfo.price / 100} €
                                    </td>
                                  </tr>`;
        cartTable.append(cartTableRow);
      })
      .catch((error) => alert(error));
  });
}

// Pour afficher le prix total en bas du <table> Panier :
if (getCart !== null) {
  const totalPriceRow = document.createElement("tfoot");
  totalPriceRow.innerHTML = `<tr><td colspan="2" class="right p-3">Total :</td></tr>`;
  cartTable.append(totalPriceRow);
}

// Pour vider le panier :
emptyCart = () => {
  localStorage.clear("products");
  location.reload();
};

const button = document.getElementById("empty-cart");
button.addEventListener("click", emptyCart);
/* On utilise la méthode addEventListener() pour surveiller les clics de souris sur le bouton 
"Vider le panier", qui appelle la fonction stockée dans la variable emptyCart : */
