const navbar = document.getElementsByTagName("nav")[0];
const userNameDisplay = document.getElementById("userNameDisplay");
const btnConnexion = document.getElementById("btnconnexion");
const btnRegister = document.getElementById("btnregister");
const btnLogout = document.getElementById("btnlogout");
const spanBtnRegister = btnRegister.getElementsByTagName("span")[0];
const connexionTimeDisplay = document.getElementById("connexionTimeDisplay");

// Gere l'affichage de la date de connexion
const displayConnexionTime = () => {
  // On récupere la date du local storage
  const dateConnexion = new Date(localStorage.getItem("dateConnexion"));
  // On crée la chaine de caracteère a afficher en prenant le soint d'avoir tjrs 2 caractères pour chaque champ
  stringToDisplay = `Tu t'es connecté le ${("0" + dateConnexion.getDate()).slice(-2)}/ ${("0" + dateConnexion.getMonth()).slice(-2)}/${dateConnexion.getFullYear()} à ${("0" + dateConnexion.getHours()).slice(-2)}h${("0" + dateConnexion.getMinutes()).slice(-2)}`;
  //On l'ajoute dans le domme
  connexionTimeDisplay.innerText = stringToDisplay;
};

//Mets a jour l'affichage de la navbar
const updateNavbar = () => {
  const currentUser = localStorage.getItem("currentUser");

  // Si aucun membre n'estr connecté
  if (currentUser == null || currentUser.length == 0) {
    //On enleve le nom de l'utilisateur
    userNameDisplay.innerText = "";
    userNameDisplay.style.display = "none";
    // On affiche les boutons connexion et créer un compte et on cache le bouton déconnexion
    btnConnexion.style.display = "block";
    btnRegister.style.display = "block";
    btnLogout.style.display = "none";
  }
  // Sinon si un membre est connecté
  else {
    // On affiche le nom de 'lutilisateur
    userNameDisplay.innerText = currentUser;
    userNameDisplay.style.display = "inline-block";
    // On cache le bouton connexion et créer un comtpe et on affiche le bouton déconnexion
    btnConnexion.style.display = "none";
    btnRegister.style.display = "none";
    btnLogout.style.display = "block";
    //On afficher la fate de connexion
    displayConnexionTime();
  }
};
updateNavbar();

//On gère les clics sur la navbar avec la délégation d'évenenment
navbar.addEventListener("click", (event) => {
  // Si la target du clic est le bouton déconnexion
  if (
    event.target.id == "btnlogout" ||
    event.target.parentNode.id == "btnlogout"
  ) {
    // On supprime le currentUser et le panier
    localStorage.removeItem("panier");
    localStorage.removeItem("currentUser");
    // On recharge la navbar et on gere mes droits d'accès des pages
    updateNavbar();
    authRedirect();
  }
  // Si c'est le bouton connexion
  else if (
    event.target.id == "btnconnexion" ||
    event.target.parentNode.id == "btnconnexion"
  ) {
    // On redirige sur la page login si on y est pas déja
    if (!window.location.href.includes("/src/login.html")) {
      window.location.href = "./login.html";
    }
  }
  // Si c'est le bouton créer un compte
  else if (
    event.target.id == "btnregister" ||
    event.target.parentNode.id == "btnregister"
  ) {
    // On redirige sur la page creer un compte si on y est pas déja
    if (!window.location.href.includes("/src/register.html")) {
      window.location.href = "./register.html";
    }
  }
});
