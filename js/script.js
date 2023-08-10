// import CryptoJS from 'CryptoJS';
const publicKey = "1f0bcb9b187fc93f847f1cafd9f85468";
const privateKey = "10b70287677eba0342d98cc0e6a85fcd5e37846c";
const ts = Date.now();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
const apiurl = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
// console.log(apiurl);
let apiurl1;
let favorites  = []
let id, series, stories, comics, description;
const searchString = document.getElementById("searchResult");

searchString.addEventListener("input", function () {
  const searchResultValue = searchString.value;
  hitapi(searchResultValue);
});

async function hitapi(textSearch) {
  try {
    if (textSearch) {
      apiurl1 = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${textSearch}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
      await fetchData(apiurl1);
    } else {
      await fetchData(apiurl);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const characters = data.data.results;

    clearCharacterImages();
    displayCharacters(characters);

    const characterImageContainer = document.getElementById("characterImageContainer");
    const imageElements = characterImageContainer.querySelectorAll(".image-card");

    for (let i = 0; i < imageElements.length; i++) {
      const imageElement = imageElements[i];
      imageElement.addEventListener("click", function () {
        const imageSrc = this.src;
        const heroname = this.nextElementSibling.textContent;
        const descriptionElement = this.nextElementSibling.nextElementSibling;
        const description = descriptionElement.textContent;
        const id = characters[i].id;
        displayModalView(id, imageSrc, heroname, comics, stories, series, description);
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
function clearCharacterImages() {
  const characterImageContainer = document.getElementById("characterImageContainer");
  characterImageContainer.innerHTML = "";
}

function displayCharacters(characters) {
  for (let i = 0; i < 24; i++) {
    const characterImage = characters[i].thumbnail.path;
    // console.log(characterImage)
    const heroname = characters[i].name;
    description = characters[i].description;
    // console.log(description)
    comics = characters[i].comics.available;
    series = characters[i].series.available;
    stories = characters[i].stories.available;
    id = characters[i].id
    console.log(id)

    const exclude = ["image_not_available", "4c00358ec7548"];

    if (exclude.some((image) => characterImage.includes(image))) {
      continue;
    }
    const imageExtension = characters[i].thumbnail.extension;
    const fullImagePath = characterImage + "." + imageExtension;

    const characterDiv = document.createElement("div");
    characterDiv.classList.add("character-card");

    const imgElement = document.createElement("img");
    imgElement.src = fullImagePath;
    imgElement.classList.add("image-card");

    const nameElement = document.createElement("p");
    nameElement.classList.add("imageName");
    nameElement.textContent = heroname;


    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("imageDescription");
    descriptionElement.textContent = description;
    descriptionElement.style.display = "none";


    characterDiv.appendChild(imgElement);
    characterDiv.appendChild(nameElement);

    characterDiv.appendChild(descriptionElement);


    const characterImageContainer = document.getElementById("characterImageContainer");
    characterImageContainer.appendChild(characterDiv);
  }
}

function displayModalView(id,imageSrc, heroname, comics, stories, series, description) {
  const dialogElement = document.querySelector("#dialog");
  const modalImageElement = document.querySelector("#modalImage");
  const modalName = document.querySelector("#modalName-span");
  const modalComics = document.querySelector("#modalComics-span");
  const modalStories = document.querySelector("#modalStories-span");
  const modalSeries = document.querySelector("#modalSeries-span");
  const modalDescription = document.querySelector("#modalDescription-span");
  const modalId = document.querySelector("#charId");

  const parentElement = document.getElementById("dialog");

  // Check if the favourite and remove elements already exist
  const existingFavourite = parentElement.querySelector(".favHero");
  const existingRemove = parentElement.querySelector(".removeHero");
  
  // If the favourite element does not exist, create and append it
  if (!existingFavourite) {
    const favourite = document.createElement("button");
    favourite.textContent = "Favourite";
    favourite.classList.add("favHero");
    favourite.addEventListener("click",function(){
      addToFavorites(imageSrc,heroname,comics,stories,series,description)
    });
    parentElement.appendChild(favourite);
  }
  
  // If the remove element does not exist, create and append it
  if (!existingRemove) {
    const remove = document.createElement("button");
    remove.textContent = "Remove"
    remove.classList.add("removeHero");
    parentElement.appendChild(remove);
  }
  
    modalImageElement.src = imageSrc;
    modalName.textContent = heroname;
    modalComics.textContent =  comics;
    modalStories.textContent = stories;
    modalSeries.textContent =  series;
    modalId.textContent = id;
    
    if (description) {
      modalDescription.textContent = description;
    } else {
      modalDescription.textContent = "No description!";
    }

  dialogElement.showModal();
}

hitapi();


function addToFavorites(imageSrc, heroname, comics, stories, series, description) {
  const favoriteCharacter = {
    imageSrc,
    heroname,
    comics,
    stories,
    series,
    description
  };
  
  favorites.push(favoriteCharacter);
  console.log(favorites)
}

const getFav = document.querySelector(".favHero");
const removeHero = document.querySelector(".removeHero");

getFav.addEventListener("click", function(){

})

removeHero.addEventListener("click",function(){
  const modalNameElement = document.querySelector("#modalName-span");
  const heroname = modalNameElement.textContent;
})