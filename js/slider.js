class Slider {
	constructor(container, images) {
		this.container = document.querySelector(container);
		this.images = images;
		this.init();
	}

	// Initialisation du diaporama
	init() {
		this.currentSlide = 0;
		this.createSliderElements();
		this.slides = document.querySelectorAll(".slideElement");
		this.slides[this.currentSlide].style.opacity = "1";
		this.addEvents();
		this.sliderKeyControl();
		this.sliderPlay();
	}

	// Création des éléments du diaporama
	createSliderElements() {
		const sliderContainer = this.container;
		this.images.forEach(element => {
			const figure = document.createElement("figure");
			figure.className = "slideElement";
			const img = document.createElement("img");
			img.src = element;
			figure.appendChild(img);
			sliderContainer.appendChild(figure);
		});
	}

	// Fonction play du diaporama et défilement automatique
	sliderPlay() {
		this.playing = true;
		this.slideInterval = setInterval(this.nextImage.bind(this), 5000);
		const buttonPause = document.querySelector(".pause");
		buttonPause.innerHTML = '<i class="fas fa-pause"></i>';
	}

	// Fonction pause du diaporama
	sliderPause() {
		this.playing = false;
		clearInterval(this.slideInterval);
		const buttonPause = document.querySelector(".pause");
		buttonPause.innerHTML = '<i class="fas fa-play"></i>';
	}

	// Défilement en avant du diaporama
	nextImage() {
		this.slides[this.currentSlide].style.opacity = "0";
		this.currentSlide = (this.currentSlide + 1) % this.slides.length;
		this.slides[this.currentSlide].style.opacity = "1";
		if (this.playing === true) {
			clearInterval(this.slideInterval);
			this.slideInterval = setInterval(this.nextImage.bind(this), 5000);
		}
	}

	// Retour à l'image précédente
	previousImage() {
		this.slides[this.currentSlide].style.opacity = "0";
		this.currentSlide = (this.currentSlide - 1) % this.slides.length;
		if (this.currentSlide === -1) {
			this.currentSlide = this.slides.length - 1;
			this.slides[this.currentSlide].style.opacity = "1";
		} else {
			this.slides[this.currentSlide].style.opacity = "1";
		}
		clearInterval(this.slideInterval);
		if (this.playing === true) {
			this.slideInterval = setInterval(this.nextImage.bind(this), 5000);
		}
	}

	// Contrôle du diaporama avec les flèches du clavier
	sliderKeyControl() {
		document.addEventListener('keydown', e => {
			if (e.keyCode === 37) {
				clearInterval(this.slideInterval);
				this.previousImage();
			}
			if (e.keyCode === 39) {
				clearInterval(this.slideInterval);
				this.nextImage();
			}
		});
	}

	// Ajout des événènements sur les boutons du diaporama
	addEvents() {
		const rightButton = document.querySelector(".next");
		rightButton.addEventListener("click", this.nextImage.bind(this));
		const leftButton = document.querySelector(".prev");
		leftButton.addEventListener("click", this.previousImage.bind(this));
		const buttonPause = document.querySelector(".pause");
		buttonPause.addEventListener("click", e => {
			if (this.playing === true) {
				this.sliderPause();
			} else {
				this.sliderPlay();
			}
		});
	}

} // Fin de la classe Slider
