//On récupe les éléments HTML
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const button = document.getElementById("connexion");
const wrongIdSpan = document.getElementById("wrongId");

/* 
Récupere la liste des users dans le localStorage et retourne une Map de tous les identifiants souls la forme [email, pawwsord]

*/
const retrieveLogs = () => {
  const usersArray = JSON.parse(localStorage.getItem("usersList"));
  const logsMap = new Map();
  usersArray.map((user) => {
    logsMap.set(user.email, user.password);
  });

  return logsMap;
};

/**
 *  Verifie si les idententifiants fournis sont valides
 *
 * @param { string } email
 * @param { string } password
 * @returns { Boolean }
 */
const logIsCorrect = (email, password) => {
  logs = retrieveLogs();
  for (let logEntry of logs) {
    if (logEntry[0] == email && logEntry[1] == password) {
      return true;
    }
  }
  return false;
};

// Si un membre est conencté on redirige vers la page produit
if (localStorage.getItem("currentUser")) {
  window.location.href = "./produits.html";
}

// gestion du clic sur le bouton connexion
const login = (event) => {
  event.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  if (logIsCorrect(email, password)) {
    // Si la comninaison email mdp est bon on stocke l'utilisateur actif, sa date de connexion et le panier  avant de le rediriger sur la page produits
    localStorage.setItem("currentUser", email);
    localStorage.setItem("dateConnexion", new Date());
    localStorage.setItem(
      "panier",
      JSON.stringify({
        1: 0,
        2: 0,
        3: 0,
      }),
    );
    window.location.href = "./produits.html";
  } else {
    wrongIdSpan.style.display = "inline-block";
  }
};

button.addEventListener("click", login);
