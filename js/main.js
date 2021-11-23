window.onload = () => {
	const images = ["img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png", "img/7.png", "img/8.png"];

	let mySlider = new Slider("#diaporama", images);

	let myMap = new Map("map");

	myMap.stationsRecovery("https://api.jcdecaux.com/vls/v1/stations?contract=amiens&apiKey=a437bbceccabb0102c5776127d3102f6fccbc25e");

	let myBooking = new Booking();
}