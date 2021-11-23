class Map {
	constructor(map, latLng = [49.89, 2.29], zoom = 14, layer = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', minZoom = 14, maxZoom = 18) {
		this.map = map;
		this.latLng = latLng;
		this.zoom = zoom;
		this.layer = layer;
		this.minZoom = minZoom;
		this.maxZoom = maxZoom;
		this.init();
	}

	// Initialisation de la carte et définition des marqueurs
	init() {
		this.myMap = L.map(this.map).setView(this.latLng, this.zoom);
		this.markersCluster = L.markerClusterGroup();
		L.tileLayer(this.layer, {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}, {minZoom: this.minZoom, maxZoom: this.maxZoom}).addTo(this.myMap);
		this.myMap.addLayer(this.markersCluster);
		this.redMarker = L.ExtraMarkers.icon({
			icon: 'fa-biking',
			markerColor: 'red',
			shape: 'circle',
			prefix: 'fa'
		});
		this.orangeMarker = L.ExtraMarkers.icon({
			icon: 'fa-biking',
			markerColor: 'orange',
			shape: 'circle',
			prefix: 'fa'
		});
		this.greenMarker = L.ExtraMarkers.icon({
			icon: 'fa-biking',
			markerColor: 'green-light',
			shape: 'circle',
			prefix: 'fa'
		});
	}

	// Récupération de la position et de l'état des stations, attribution des marqueurs
	stationsRecovery(source) {
		ajaxGet(source, reponse => {
			let stationsList = JSON.parse(reponse);
			stationsList.forEach(station => {
				this.latLng = [station.position.lat, station.position.lng];
				if (station.status === "CLOSED") {
					this.marker = L.marker(this.latLng, {
						icon: this.redMarker
					});
					this.markersCluster.addLayer(this.marker);
				} else if (station.status === "OPEN" && station.available_bikes === 0) {
					this.marker = L.marker(this.latLng, {
						icon: this.orangeMarker
					});
					this.markersCluster.addLayer(this.marker);
				} else {
					this.marker = L.marker(this.latLng, {
						icon: this.greenMarker
					});
					this.markersCluster.addLayer(this.marker);
				}

				// Récupération des informations de la station au clic sur le marqueur
				this.marker.on('click', e => {
					const infosContainer = document.getElementById("stationInfos");
					infosContainer.innerHTML = "";

					const title = document.createElement("p");
					title.id = "stationName";
					title.appendChild(document.createTextNode(station.name));

					const address = document.createElement("p");
					address.appendChild(document.createTextNode(`Adresse : ${station.address}`));

					const availableBikeStands = document.createElement("p");
					availableBikeStands.appendChild(document.createTextNode(`${station.available_bike_stands} places`));

					const availableBikes = document.createElement("p");
					availableBikes.appendChild(document.createTextNode(`${station.available_bikes} vélos disponibles`));

					const noAvailableBikes = document.createElement("p");
					noAvailableBikes.className = "noAvailableBikes";
					noAvailableBikes.createTextNode = "Aucun vélo disponible actuellement à cette station";
					
					const status = document.createElement("p");
					if (station.status === "OPEN") {
						status.className = "open";
						status.appendChild(document.createTextNode(`Station OUVERTE`));
					}
					if (station.status === "CLOSED") {
						status.className = "closed";
						status.appendChild(document.createTextNode(`Station FERMEE`));
					}

					const formName = document.getElementById("formName");
					const button = document.getElementById("buttonReserver");
					
					// Affichage des informations et du formulaire si un vélo est disponible 
					infosContainer.appendChild(title);
					infosContainer.appendChild(address);
					infosContainer.appendChild(availableBikeStands);
					infosContainer.appendChild(availableBikes);
					infosContainer.appendChild(status);
					
					if (status.className === "open" && station.available_bikes !== 0) {
						formName.style.display = "block";
						formName.appendChild(button);
					}
					if (status.className === "open" && station.available_bikes === 0) {
						noAvailableBikes.style.display = "block";
						formName.style.display = "none";
					}

				}) // Fin de l'évènement clic sur le marqueur
				
			}) // Fin du forEach
		}) //Fin du ajaxGet
	} // Fin de stationRecovery
	
} //Fin de la classe Map
