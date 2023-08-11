// function displayFavorites() {
//   // Get favorites from localStorage
//   let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

//   // Clear favorites container
//   const favoritesContainer = document.querySelector("#favorites-container");
//   favoritesContainer.innerHTML = "";

//   // Display favorite superheroes
//   favorites.forEach(id => {
//     // Create superhero element
//     const superheroElement = document.createElement("div");
//     superheroElement.classList.add("superhero");

//     // Get superhero data from API
//     const apiUrl = `http://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
//     fetchData(apiUrl).then(data => {
//       const character = data[0];
//       const { thumbnail, name } = character;
//       const imageExtension = thumbnail.extension;
//       const fullImagePath = `${thumbnail.path}.${imageExtension}`;

//       // Create image element
//       const imgElement = document.createElement("img");
//       imgElement.src = fullImagePath;
//       imgElement.classList.add("superhero-image");

//       // Create name element
//       const nameElement = document.createElement("p");
//       nameElement.classList.add("superhero-name");
//       nameElement.textContent = name;

//       // Create remove button
//       const removeButton = document.createElement("button");
//       removeButton.classList.add("remove-button");
//       removeButton.textContent = "Remove from favorites";
//       removeButton.onclick = () => {
//         removefromfavorites(id);
//         displayFavorites();
//       };

//       // Append elements to superhero element
//       superheroElement.appendChild(imgElement);
//       superheroElement.appendChild(nameElement);
//       superheroElement.appendChild(removeButton);
//     });

//     // Append superhero element to favorites container
//     favoritesContainer.appendChild(superheroElement);
//   });
// }

// window.onload = () => {
//   displayFavorites();
// };


// Retrieve the data from localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

favorites.forEach(hero=>{
  console.log(`Name: ${hero.heroname}`);
  console.log(`Image: ${hero.imageSrc}`);
  console.log(`Comics: ${hero.comics}`);
  console.log(`Stories: ${hero.stories}`);
  console.log(`Series: ${hero.series}`);
  console.log(`Description: ${hero.description}`);
})