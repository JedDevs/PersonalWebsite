const imageContainer = document.querySelector('.image-container');
const imagePaths = [ // Replace with your image paths
    "images/1_NightSky.png",
    "images/2_Background.png"
];

let currentIndex = 0;
let stackingInProgress = false;

function addImageToContainer(imagePath) {
    const imageLayer = document.createElement('div');
    imageLayer.classList.add('image-layer');

    const image = document.createElement('img');
    image.src = imagePath;
    image.alt = 'Layered Image';

    imageLayer.appendChild(image);
    imageLayer.style.opacity = 0.5;

    imageContainer.appendChild(imageLayer);
}

function loadNextImage() {
    if (currentIndex < imagePaths.length) {
        addImageToContainer(imagePaths[currentIndex]);
        currentIndex++;
    } else {
        stackingInProgress = false;
    }
}

document.addEventListener('wheel', event => {
    console.log("Test Wheel")
    if (!stackingInProgress) {
        stackingInProgress = true;
        loadNextImage();
    }
});