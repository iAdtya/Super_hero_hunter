// import CryptoJS from 'CryptoJS';
const publicKey = "1f0bcb9b187fc93f847f1cafd9f85468";
const privateKey = "10b70287677eba0342d98cc0e6a85fcd5e37846c";
const ts = Date.now();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
const apiurl = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
console.log(apiurl)

const searchString = document.getElementById("searchResult");
const characterImageContainer = document.getElementById("characterImageContainer");
const dialogElement = document.querySelector("#dialog");
const modalImageElement = document.querySelector("#modalImage");
const modalName = document.querySelector("#modalName-span");
const modalComics = document.querySelector("#modalComics-span");
const modalStories = document.querySelector("#modalStories-span");
const modalSeries = document.querySelector("#modalSeries-span");
const modalDescription = document.querySelector("#modalDescription-span");

let apiurl1;
let favorites = [];

searchString.addEventListener("input", function () {
  hitapi(searchString.value);
});

async function hitapi(textSearch) {
  try {
    apiurl1 = textSearch ? `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${textSearch}&ts=${ts}&apikey=${publicKey}&hash=${hash}` : apiurl;
    await fetchData(apiurl1);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const { data } = await response.json();
    const characters = data.results.slice(0, 20);

    clearCharacterImages();
    displayCharacters(characters);
  } catch (error) {
    console.error("Error:", error);
  }
}

function clearCharacterImages() {
  characterImageContainer.innerHTML = "";
}

function displayCharacters(characters) {
  characters.forEach((character) => {
    const {id, thumbnail, name, description, comics, series, stories } = character;
    const { path, extension } = thumbnail;

    if (path.includes("image_not_available") || path.includes("4c00358ec7548") || path.includes("4ce18691cbf04") || path.includes("5232158de5b16")) {
      return;
    }

    const fullImagePath = `${path}.${extension}`;

    const characterDiv = document.createElement("div");
    characterDiv.classList.add("character-card");

    const imgElement = document.createElement("img");
    imgElement.src = fullImagePath;
    imgElement.classList.add("image-card");

    const nameElement = document.createElement("p");
    nameElement.classList.add("imageName");
    nameElement.textContent = name;

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("imageDescription");
    descriptionElement.textContent = description;
    descriptionElement.style.display = "none";

    characterDiv.appendChild(imgElement);
    characterDiv.appendChild(nameElement);
    characterDiv.appendChild(descriptionElement);

    characterDiv.addEventListener("click", () => {
      displayModalView(id,fullImagePath, name, comics.available, stories.available, series.available, description);
    });

    characterImageContainer.appendChild(characterDiv);
  });
}

async function displayModalView(id,imageSrc, heroname, comics, stories, series, description) {
  const existingFavourite = dialogElement.querySelector(".favHero");
  const existingRemove = dialogElement.querySelector(".removeHero");

  if (!existingFavourite) {
    const favourite = createButton("Favourite", "favHero", () => {
      addToFavorites(id,imageSrc, heroname, comics, stories, series, description);
    });
    dialogElement.appendChild(favourite);
  }

  if (!existingRemove) {
    const remove = createButton("Remove", "removeHero", () => {
      removeFromFavorites(id,heroname);
    });
    dialogElement.appendChild(remove);
  }

  modalImageElement.src = imageSrc;
  modalName.textContent = heroname;
  modalComics.textContent = comics;
  modalStories.textContent = stories;
  modalSeries.textContent = series;
  modalDescription.textContent = description || "No description!";

  await new Promise((resolve) => {
    dialogElement.addEventListener("close", resolve, { once: true });
    dialogElement.showModal();
  });

}

function createButton(text, className, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add(className);
  button.addEventListener("click", onClick);
  return button;
}

function addToFavorites(id,imageSrc, heroname, comics, stories, series, description) {
  const favoriteCharacter = {id, imageSrc, heroname, comics, stories, series, description };
  favorites.push(favoriteCharacter);
  console.log("Updated Favorites:", favorites);
}

function removeFromFavorites(id) {
  favorites = favorites.filter((character) => {
    console.log(`Comparing ${character.id} with ${id}`);
    return character.id !== id;
  });
  console.log("Updated Favorites:", favorites);
}

hitapi();
