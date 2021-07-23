// Pour afficher un message personnalisé à l'utilisateur suite à sa commande :
const displayValidationMessage = () => {
  // Pour récupérer les données stockées dans le Local Storage :
  const totalPrice = localStorage.getItem("totalprice");
  const orderId = localStorage.getItem("orderid");
  const firstName = localStorage.getItem("firstname");
  const lastName = localStorage.getItem("lastname");

  // Pour afficher les données récupérées :
  const main = document.querySelector(".message");
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `<p>
                            Merci pour votre achat, 
                            ${firstName} ${lastName}.
                          </p>
                          <p>
                            Votre commande n°${orderId} d'un montant
                            de ${totalPrice} € a bien été enregistrée.
                          </p>
                          <p>Vous recevrez bientôt un e-mail avec votre facture et un numéro de suivi.</p>
                          <p>À bientôt sur Orinoco !</p>`;
  main.append(messageDiv);
};

// Pour supprimer les données stockées dans le Local Storage :
const clearLocalStorage = () => {
  document.body.addEventListener("click", () => {
    localStorage.clear();
  });
};

// Appel des fonctions :
displayValidationMessage();
clearLocalStorage(); // exécutée au clic de souris sur la page
