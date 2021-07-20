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

// Pour exécuter la fonction :
displayCart();

// Pour vider le panier :
emptyCart = () => {
  localStorage.clear("products");
  location.reload();
};

/* On utilise la méthode addEventListener() pour surveiller les clics de souris sur le bouton 
"Vider le panier", qui appelle la fonction emptyCart : */
const emptyCartButton = document.getElementById("empty-cart");
emptyCartButton.addEventListener("click", emptyCart);

// Pour envoyer les données de la commande et du formulaire au back-end :
const placeAnOrder = () => {
  const form = document.getElementById("form");
  const orderButton = document.getElementById("order");
  orderButton.addEventListener("click", async (event) => {
    // Pour vérifier que le panier n'est pas vide et que les champs du formulaire sont correctement saisis :
    if (getCart !== null && form.reportValidity()) {
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
      //try {
      fetch("http://localhost:3000/api/cameras/order", {
        method: "POST", // Pour envoyer une requête HTTP de type POST au service web afin d'envoyer des données
        headers: { "Content-type": "application/json" }, // Indique le type de contenu envoyé (JSON)
        body: JSON.stringify(data), // Pour convertir la valeur de "data" (contact + products) en chaîne JSON
      }).then((response) => {
        const order = response.json();
        debugger;
        // Pour stocker l'identifiant de commande reçu, le nom et le prénom dans le localStorage :
        localStorage.setItem("orderid", order.orderId);
        localStorage.setItem("firstname", order.contact.firstName);
        localStorage.setItem("lastname", order.contact.lastName);
        // Pour afficher la page de confirmation de commande :
        window.location.href = "notification.html";
      }); /*catch (err) {
        console.log(err);
      } */
    } else {
      // Pour afficher un message à l'utilisateur si les conditions de "if" ne sont pas remplies :
      alert(
        "Merci de renseigner correctement tous les champs du formulaire et de vérifier que votre panier n'est pas vide."
      );
    }
  });
};

// Pour exécuter la fonction :
placeAnOrder();
