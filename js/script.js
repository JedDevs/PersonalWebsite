const imageContainer = document.querySelector('.image-container');
const imagePaths = [ // Replace with your image paths
	"images/1_NightSky.png",
	"images/2_Background.png",
	"images/3_Dog.png",
	"images/4_Chair.png",
	"images/5_Teddy.png",
	"images/6_Flask.png",
	"images/7_Pen.png",
	"images/8_Theo.png",
];

let currentIndex = -1;
let currentObject = null

const textOverlay = document.querySelector(".text-overlay")
const imageText = [
	"images/1_NightSky.png",
	"images/2_Background.png",
	"images/3_Dog.png",
	"images/4_Chair.png",
	"images/5_Teddy.png",
	"images/6_Flask.png",
	"images/7_Pen.png",
	"images/8_Theo.png",
]

function updateText(imageNumber) {

}

function addImageToContainer(imagePath) {
    const imageLayer = document.createElement('div');
    imageLayer.classList.add('image-layer');

    const image = document.createElement('img');
	image.classList.add('image');

    image.src = imagePath;
    image.alt = 'Layered Image';

    imageLayer.appendChild(image);
    imageContainer.appendChild(imageLayer);

	currentObject = imageLayer
}

function addNewImage(imageNumber) {
	if (imageNumber < imagePaths.length) {
        addImageToContainer(imagePaths[imageNumber]);
		updateExistingImage()
	}
}

function updateExistingImage() {
	let indexDecimal = currentIndex / 100
	let newOpacity = indexDecimal - Math.floor(indexDecimal)

	currentObject.style.opacity = newOpacity
	console.log(newOpacity)

}

function scrollActivated() {
	let lastIndex = currentIndex
	currentIndex++

	let lastImage = Math.floor(lastIndex / 100)
	let currentImage = Math.floor(currentIndex / 100) // + 1

	if (lastImage !== currentImage) {
		addNewImage(currentImage)
	} else {
		if (currentImage >=imagePaths.length) {
			return
		}
		updateExistingImage()
	}
}

// PC Support
document.addEventListener('wheel', event => {
	//console.log(event.deltaY)
	if (event.deltaY > 0) {
		scrollActivated()
    } else {
		//currentIndex--
	}
});

let startY; // Mobile Support

document.addEventListener('touchstart', event => {
	startY = event.touches[0].clientY;
});

function delayedScrollActivation(index) {
	setTimeout(function() {
	  scrollActivated();
	  if (index < 99) {
		delayedScrollActivation(index + 1);
	  }
	}, 10); // Adjust the delay time as needed (in milliseconds)
  }

document.addEventListener('touchmove', event => {
	if (startY !== undefined) {
		const deltaY = event.touches[0].clientY - startY;
    
		if (Math.abs(deltaY) > 0) {
			delayedScrollActivation(1)
		}
		startY = undefined;
	}
});
