const form = document.querySelector("form");
const input = document.querySelector("input");
const loadingImage = document.querySelector("#loadingImage");
const API_URL =
  "https://api.500px.com/v1/photos/search?type=photos&image_size%5B%5D=14&consumer_key=i2HrYs9G1tR4tkfoBKrMorxz0Ulo9nKIKnx6j91S&include_states=true&formats=jpeg&exclude_nude=true";
const imageSection = document.querySelector(".images");

loadingImage.style.display = "none";

form.addEventListener("submit", formSubmitted);

function formSubmitted(event) {
  event.preventDefault();
  const searchTerm = input.value;
  search(searchTerm).then(displayImages);
}
function search(searchTerm) {
  imageSection.innerHTML = "";
  const url = `${API_URL}&term=${searchTerm}`;
  loadingImage.style.display = "";
  return fetch(url)
    .then(response => response.json())
    .then(result => {
      return result.photos;
    });
}

function displayImages(images) {
  imageSection.innerHTML = "";
  images.forEach(image => {
    const imageElement = document.createElement("img");
    imageElement.src = image.image_url[0];
    imageElement.className = "col-md-4";
    imageSection.appendChild(imageElement);
  });
  loadingImage.style.display = "none";
}
