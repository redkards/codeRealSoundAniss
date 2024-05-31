const connexionTimeTitle = document.getElementById("connexionTime");
const cards = document.getElementsByClassName("card");

// On gère les droits d'accès à la page
authRedirect();

for (let card of cards) {
  const btnPlus = card.getElementsByClassName("btnplus")[0];
  const btnMoins = card.getElementsByClassName("btnmoins")[0];
  const btnPanier = card.getElementsByClassName("btnPanier");
  const count = card.getElementsByClassName("number")[0];

  card.addEventListener("click", (event) => {
    //si c'est le bouton plus qui declenche l'évenement
    if (
      event.target.classList.contains("btnplus") ||
      event.target.parentNode.classList.contains("btnplus")
    ) {
      const oldCount = Number(count.innerText);
      newCount = oldCount + 1;
      count.innerText = newCount;
    }
    // Si c'est le bouton moins
    else if (
      event.target.classList.contains("btnmoins") ||
      event.target.parentNode.classList.contains("btnmoins")
    ) {
      const oldCount = Number(count.innerText);
      newCount = oldCount - 1;
      count.innerText = newCount < 1 ? 1 : newCount;
    }
    // Si c'est le bouton panier
    else if (
      event.target.classList.contains("btnPanier") ||
      event.target.parentNode.classList.contains("btnPanier")
    ) {
      addToCart(Number(card.id), Number(count.innerText));
    }
  });
}
