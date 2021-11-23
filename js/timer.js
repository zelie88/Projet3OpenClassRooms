class Timer {
	constructor(ms = 1200000, minTimer = "min", secTimer = "sec", textTimerContainer = "textTimer") {
		this.time = ms / 1000;
		this.init();
		this.minTimer = document.getElementById("min");
		this.secTimer = document.getElementById("sec");
		this.textTimerContainer = document.getElementById("textTimer");
		this.minTimer.textContent = this.minute;
		this.secTimer.textContent = this.second;
		this.endTimeEvent = new Event('endTimeEvent', {
			bubbles: true
		});
	}

	// Inilialisation du compte à rebours
	init() {
		this.calcMinutes();
		this.calcSeconds();
		this.startDecrease();
	}

	// Lancement du décompte
	startDecrease() {
		let chrono = setInterval(() => {
			this.interval = chrono;
			this.time--;
			if (this.time > 0) {
				this.calcMinutes();
				this.calcSeconds();
				this.minTimer.textContent = this.minute;
				this.secTimer.textContent = this.second;
			} else {
				this.stop()
			}
		}, 1000);
	}

	// Fin du décompte
	stop() {
		clearInterval(this.interval);
		document.dispatchEvent(this.endTimeEvent);
	}

	// Définition des minutes
	calcMinutes() {
		this.minute = Math.floor(this.time / 60);
	}

	// Définition des secondes
	calcSeconds() {
		this.second = Math.floor(this.time - (this.minute * 60));
	}

} // Fin de la classe Timer