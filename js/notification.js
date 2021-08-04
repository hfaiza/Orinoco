// Pour afficher un message personnalisé à l'utilisateur suite à sa commande :
const displayValidationMessage = () => {
  // Pour récupérer les données stockées dans le Local Storage :
  const totalPrice = localStorage.getItem("totalPrice");
  const orderId = localStorage.getItem("orderId");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  // Pour afficher les données récupérées :
  const container = document.querySelector(".message");
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
  container.append(messageDiv);
};

// Appel de la fonction :
displayValidationMessage();
