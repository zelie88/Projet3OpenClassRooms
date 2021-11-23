class Canvas {
	constructor(canvas = "canvas", color = "#000") {
		this.canvas = document.getElementById("canvas");
		this.context = this.canvas.getContext('2d');
		this.color = color;
		this.paint = false;
		this.painted = false;
		this.mouseX = 0;
		this.mouseY = 0;
		this.context.lineJoin = "round";
		this.context.lineCap = "round";
		this.context.lineWidth = 4;
		this.context.strokeStyle = this.color;
		this.lastPosition = {
			x: 0,
			y: 0
		};
		this.draw();
		this.clearCanvas();
	}

	// Fonction dessin
	draw() {
		// Lancement du dessin au clic de la souris
		this.canvas.addEventListener("mousedown", (e) => {
			this.paint = true;
			this.mouseX = e.clientX - (this.canvas.getBoundingClientRect().left);
			this.mouseY = e.clientY - (this.canvas.getBoundingClientRect().top + window.scrollX);
			this.lastPosition = {
				x: this.mouseX,
				y: this.mouseY
			};
		});
		// Dessin avec la souris
		this.canvas.addEventListener("mousemove", (e) => {
			if (this.paint) {
				this.mouseX = e.clientX - (this.canvas.getBoundingClientRect().left);
				this.mouseY = e.clientY - (this.canvas.getBoundingClientRect().top + window.scrollX);
				this.context.beginPath();
				this.context.moveTo(this.lastPosition.x, this.lastPosition.y);
				this.context.lineTo(this.mouseX, this.mouseY);
				this.context.closePath();
				this.context.strokeStyle;
				this.context.stroke();
				this.painted = true;
				this.lastPosition = {
					x: this.mouseX,
					y: this.mouseY
				};
			}
		});
		// Arrêt du dessin à l'arrêt du clic ou si hors cadre
		this.canvas.addEventListener("mouseup", (e) => this.paint = false);
		this.canvas.addEventListener("mouseleave", (e) => this.paint = false);

		// Lancement du dessin à l'appui du doigt
		this.canvas.addEventListener("touchstart", (e) => {
			let touch = e.touches[0];
			this.paint = true;
			this.mouseX = touch.clientX - this.canvas.getBoundingClientRect().left;
			this.mouseY = touch.clientY - (this.canvas.getBoundingClientRect().top + window.scrollX);
			this.lastPosition = {
				x: this.mouseX,
				y: this.mouseY
			};
		});
		// Dessin au doigt
		this.canvas.addEventListener("touchmove", (e) => {
			if (this.paint) {
				let touch = e.touches[0];
				this.mouseX = touch.clientX - this.canvas.getBoundingClientRect().left;
				this.mouseY = touch.clientY - (this.canvas.getBoundingClientRect().top + window.scrollX);
				this.context.beginPath();
				this.context.moveTo(this.lastPosition.x, this.lastPosition.y);
				this.context.lineTo(this.mouseX, this.mouseY);
				this.context.closePath();
				this.context.strokeStyle;
				this.context.stroke();
				this.painted = true;
				this.lastPosition = {
					x: this.mouseX,
					y: this.mouseY
				};
			}
		});
		// Arrêt du dessin à l'arrêt du contact ou si hors cadre
		this.canvas.addEventListener("touchend", (e) => this.paint = false);
		this.canvas.addEventListener("touchleave", (e) => this.paint = false);

	} // Fin de la fonction dessin

	// Réinitialisation du canvas si annulation
	clearCanvas() {
		const resetButton = document.getElementById('reset');
		resetButton.addEventListener('click', () => {
			this.resetCanvas();
		});
		this.mouseX = 0;
		this.mouseY = 0;
		this.lastPosition = {
			x: 0,
			y: 0
		};
	}

	// Nettoyage du canvas
	resetCanvas() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.painted = false;
	}

} //Fin de la classe Canvas