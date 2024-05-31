if (!localStorage.getItem("usersList")) {
  // Si l'item usersList n'existe pas dans le local storage on le crée
  localStorage.setItem("usersList", "[]");
}
