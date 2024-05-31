retrieveCart = () => {
  const panierStringified = localStorage.getItem("panier");
  const panier = JSON.parse(panierStringified);
  return panier;
};

saveCart = (panier) => {
  localStorage.setItem("panier", JSON.stringify(panier));
};

const addToCart = (id, quantity) => {
  const cart = retrieveCart();
  const oldQuantity = Number(cart[id]);
  const newQuantity = oldQuantity + quantity;
  cart[id] = newQuantity;
  saveCart(cart);
};

// Permet de rediriger l'utilisateur s'ilm n'est pas authentifié
const authRedirect = () => {
  // Si currentUser est null => aucun utilisateur connecté
  const currentUser = localStorage.getItem("currentUser");
  // On redirige l'utilsiateur sur l'ecran de connexion si il n'est pas sur la page de création de compte ou de connexion si il n'est pas connecté
  if (!currentUser) {
    if (
      !window.location.href.includes("/login.html") ||
      !window.location.href.includes("/register.html")
    ) {
      window.location.href = "./login.html";
    }
  }
};
