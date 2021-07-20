// Pour récupérer les données stockées dans le localStorage (prix total, identifiant de commande, prénom et nom) :
const getTotalPrice = localStorage.getItem("totalprice");
const getOrderId = localStorage.getItem("orderid");
const getFirstName = localStorage.getItem("firstname");
const getLastName = localStorage.getItem("lastname");

// Pour afficher un message personnalisé à l'utilisateur suite à sa commande :
const getOrderData = () => {
  const main = document.querySelector(".message");
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `<p>
                            Merci pour votre achat, 
                            ${getFirstName} ${getLastName}.
                          </p>
                          <p>
                            Votre commande n°${getOrderId} d'un montant
                            de ${getTotalPrice / 100} € a bien été enregistrée.
                          </p>
                          <p>Vous recevrez bientôt un e-mail avec votre facture et un numéro de suivi.</p>
                          <p>À bientôt sur Orinoco !</p>`;
  main.append(messageDiv);
};

// Pour exécuter la fonction :
getOrderData();

// Pour vider le panier et les informations de l'utilisateur au clic de souris sur la page :
const clearLocalStorage = () => {
  localStorage.clear();
};

document.body.addEventListener("click", clearLocalStorage);
