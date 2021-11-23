class Booking {
	constructor() {
		this.canvasContainer = document.getElementById("signature");
		this.timerContainer = document.getElementById("timer");
		this.textTimer = document.getElementById("textTimer");
		this.timerStationName = document.getElementById("station");
		this.form = document.getElementById("formName");
		this.timerVorname = document.getElementById("prenom");
		this.timerName = document.getElementById("nom");
		this.buttonReserver = document.getElementById("buttonReserver");
		this.init();
	}

	// Initialisation du canvas
	init() {
		this.myCanvas = new Canvas();
		this.displayCanvas();
		this.submitCanvas();
		this.endTimeEvent();
		this.refresh();
		this.cancel();
	}

	// Affichage du canvas si le formulaire est rempli
	displayCanvas() {
		const errorForm = document.getElementById("alertFormulaire");
		const nomFormulaire = document.getElementById("name");
		const prenomFormulaire = document.getElementById("vorname");
		prenomFormulaire.oninvalid = nomFormulaire.oninvalid = (event) => {
			errorForm.removeAttribute('hidden');
		};
		this.form.onsubmit = (event) => {
			errorForm.setAttribute('hidden', '');
			$('#exampleModalCenter').modal();
			event.preventDefault();
		};
	}

	// Stockage des informations de réservation et affichage du timer
	create() {
		if (this.textTimer.style.display === "none") {
			this.textTimer.style.display = "block";
		}
		if (document.getElementById("expired").style.display === "block") {
			document.getElementById("expired").style.display = "none";
		}

		sessionStorage.setItem("dateExpiration", this.expiration);
		
		this.timerStationName.innerHTML = this.stationName;
		sessionStorage.setItem("station", this.stationName);

		const vorname = document.getElementById("vorname").value;
		this.timerVorname.innerHTML = vorname;
		localStorage.setItem("prenom", vorname);

		const name = document.getElementById("name").value;
		this.timerName.innerHTML = name;
		localStorage.setItem("nom", name);
		
		this.timerContainer.style.display = "block";
	}

	// Si réservation en cours, récupération des données
	refresh() {
		if (sessionStorage.dateExpiration) {
			let dateExpiration = Number(sessionStorage.dateExpiration);
			let time = dateExpiration - Date.now();
			this.timer = new Timer(time);
			this.recovery();
		}
	}

	// Récupération des données stockées
	recovery() {
		this.timerContainer.style.display = "block";
		document.getElementById("station").innerHTML = sessionStorage.station;
		document.getElementById("prenom").innerHTML = localStorage.prenom;
		document.getElementById("nom").innerHTML = localStorage.nom;
	}

	// Affichage d'un message à l'expiration de la réservation
	clear() {
		sessionStorage.clear();
		this.textTimer.style.display = "none";
		document.getElementById("expired").style.display = "block";
	}

	// Annulation de la réservation à l'aide du bouton
	cancel() {
		const annuler = document.getElementById("annulerReserver");
		annuler.addEventListener("click", () => {
			this.timerContainer.style.display = "none";
			this.form.style.display = "block";
			this.timer.stop();
			sessionStorage.clear();

		});
	}

	// Si le canvas est signé, lancement de la réservation
	submitCanvas() {
		const alert = document.getElementById("alertSignature");
		const submit = document.getElementById("submit");
		submit.addEventListener('click', () => {
			if (this.myCanvas.painted) {
				if (sessionStorage.dateExpiration) {
					this.timer.stop();
					sessionStorage.clear();
				}
				this.myCanvas.resetCanvas();
				this.station = document.getElementById("stationName");
				this.timer = new Timer(1200000);
				this.expiration = Date.now() + (this.timer.time * 1000);
				this.stationName = this.station.innerHTML;
				this.create();
				$('#exampleModalCenter').modal('hide');
				this.form.style.display = "none";
				alert.setAttribute('hidden', '');

			} else {
				alert.removeAttribute('hidden');
			}
		});
	}

	// Annulation de la réservation à la fermeture du navigateur
	endTimeEvent() {
		document.addEventListener('endTimeEvent', () => {
			this.clear();
		})
	}
	
} // Fin de la classe Booking
