const form = document.getElementById("register");
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const email = document.getElementById("email");
const confirmPasswordInput = document.getElementById("passwordConfirm");
const passwordInput = document.getElementById("password");
const registerButton = document.getElementById("registerButton");

// Validation du dernier champs, cofirmation du mot de passe
// les autres champs sont validés en CSS/HTML
const verifyConfirmPassword = () => {
  if (
    passwordInput.value === confirmPasswordInput.value &&
    passwordInput.checkValidity()
  ) {
    confirmPasswordInput.classList.remove("border-red-500");
    confirmPasswordInput.classList.remove("border-transparent");
    confirmPasswordInput.classList.add("border-green-500");
    confirmPasswordInput.nextElementSibling.classList.add("hidden");
    confirmPasswordInput.setCustomValidity("");
  } else {
    confirmPasswordInput.classList.remove("border-transparent");
    confirmPasswordInput.classList.remove("border-green-500");
    confirmPasswordInput.classList.add("border-red-500");
    confirmPasswordInput.nextElementSibling.classList.remove("hidden");
    confirmPasswordInput.setCustomValidity("Not valid");
  }
};

/**
 *  Ajoute un membre à la liste des membres
 * @param { Object } user L'utilisateur que l'on souhaite ajouter à la liste des membres
 */
const addUser = (user) => {
  const usersList = JSON.parse(localStorage.getItem("usersList"));
  usersList.push(user);
  localStorage.setItem("usersList", JSON.stringify(usersList));
};

/**
 * Gère l'enregesitrement d'un nouveau membre
 */
const registerUser = () => {
  event.preventDefault();

  const User = {
    nom: nom.value,
    prenom: prenom.value,
    email: email.value,
    password: passwordInput.value,
  };

  addUser(User);
  window.location.href = "./login.html";
};

confirmPasswordInput.addEventListener("blur", verifyConfirmPassword);
passwordInput.addEventListener("blur", verifyConfirmPassword);

registerButton.addEventListener("click", registerUser);
