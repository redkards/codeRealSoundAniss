const cards = document.getElementsByClassName("card");

const subTotal = document.getElementsByClassName("subtotal")[0];
const shipping = document.getElementsByClassName("shipping")[0];
const total = document.getElementsByClassName("total")[0];
const panierUserTitle = document.getElementById("panierUserTitle");
const divPanierVide = document.getElementById("panierVide");
// Permet de récuperer le user actuel
const getCurrentUser = () => {
  let currentUser = null;
  const currentUserMail = localStorage.getItem("currentUser");
  const usersList = JSON.parse(localStorage.getItem("usersList"));
  for (user of usersList) {
    if (user.email == currentUserMail) {
      currentUser = user;
      break;
    }
  }
  return currentUser;
};

// Afficher le header du panier avec le nom prenom de l'user
const displayPanierTitle = () => {
  const currentUser = getCurrentUser();

  panierUserTitle.innerText = `Panier de ${user.prenom} ${user.nom}`;
};

// Permets de mettre à jour l'affichage du total du panier
const updateTotal = () => {
  let shippingCost;
  const cart = retrieveCart();
  // On mets a jour le sous total
  let subTotalPrice = 0;
  for (card of cards) {
    subTotalPrice += parseFloat(card.dataset.subTotal);
  }
  subTotal.innerText = `${parseFloat(subTotalPrice).toFixed(2)} €`;

  // On affiche les frais de ports
  if (subTotalPrice && subTotalPrice < 30) shippingCost = 10;
  else if (subTotalPrice && subTotalPrice < 50) shippingCost = 7;
  else shippingCost = 0;

  shipping.innerText = `${shippingCost} €`;

  //on affiche le total
  total.innerText = `${parseFloat(subTotalPrice + shippingCost).toFixed(2)} €`;

  // On gère la div panier vide
  if (!cart[1] && !cart[2] && !cart[3]) {
    divPanierVide.style.display = "block";
  } else {
    divPanierVide.style.display = "none";
  }
};

// On gère les droits d'accès à la page
authRedirect();
// On affiche le titre du panier
displayPanierTitle();

// On parcours chaque carte une par une pour y appliquer la gestion des evenements et l'affichage des valeurs
for (let card of cards) {
  const id = Number(card.id);
  const PRICES = {
    1: 39.99,
    2: 38.99,
    3: 14.99,
  };

  const prix = card.getElementsByClassName("prix")[0];
  const btnPlus = card.getElementsByClassName("btnplus")[0];
  const btnMoins = card.getElementsByClassName("btnmoins")[0];
  const btnSupprimer = card.getElementsByClassName("supprimer")[0];
  const count = card.getElementsByClassName("count")[0];

  // Fonction qui gère l'affichage des cartes du panier, il aurait été mieux de l'implementer en dehors de la boucle for
  const updateCard = () => {
    const panierToDisplay = retrieveCart();
    //Si il y a au moins un item dans le panier pour ce produit on affiche la carte sinon on ne l'affiche pas
    panierToDisplay[id]
      ? (card.style.display = "flex")
      : (card.style.display = "none");
    // on affiche la quantité d'items
    count.innerText = panierToDisplay[id];
    // on affiche le prix arrondi au dixième
    calculatedPrice = parseFloat(panierToDisplay[id] * PRICES[id]).toFixed(2);
    prix.innerText = `${calculatedPrice}€`;
    card.dataset.subTotal = calculatedPrice;

    // On mets a jour le total du panier
    updateTotal();
  };
  updateCard();
  //On gère l'ensemble des cliques avec un seul event listener déclaré sur toute la card
  card.addEventListener("click", (event) => {
    // Si on clique sur le bouton plus
    if (event.target.classList.contains("btnplus")) {
      // on increment le panier on le sauvegarde et on mets a jour l'affichage
      const panier = retrieveCart();
      panier[id]++;
      saveCart(panier);
      updateCard();
    }
    // Si on clique sur moins, même principe
    else if (event.target.classList.contains("btnmoins")) {
      const panier = retrieveCart();
      // On ne peut pas descendre sous une quantité de 1
      if (panier[id] > 1) {
        panier[id]--;
      }

      saveCart(panier);
      updateCard();
    }
    //Si on clique sur supprimer l'article
    else if (
      event.target.classList.contains("supprimer") ||
      event.target.parentNode.classList.contains("supprimer")
    ) {
      const panier = retrieveCart();
      panier[id] = 0;
      saveCart(panier);
      updateCard();
    }
  });
}

// On gère l'arrichage de la card panier vide
