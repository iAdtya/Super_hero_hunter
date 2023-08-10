document.addEventListener("DOMContentLoaded", () => {
    const favoritesList = document.getElementById("favoritesList");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
    function updateFavoritesList() {
      favoritesList.innerHTML = "";
  
      for (const superhero of favorites) {
        const listItem = document.createElement("li");
        listItem.textContent = superhero.heroname;
  
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove from Favorites";
        removeButton.addEventListener("click", () => {
          removeFromFavorites(superhero.heroname);
        });
  
        listItem.appendChild(removeButton);
        favoritesList.appendChild(listItem);
      }
    }
  
    function removeFromFavorites(heroname) {
      const updatedFavorites = favorites.filter(character => character.heroname !== heroname);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      updateFavoritesList();
    }
  
    updateFavoritesList();
  });
  