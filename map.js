$('document').ready(function(){
	let map = L.map('mapid').setView([45.1885, 5.7245], 13);
	L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=vt5fJPuY3rmHAQVuU320', {
			attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
	}).addTo(map);

	 $.ajax({
        url: "https://data.metromobilite.fr/api/lines/json?types=ligne",
        type: "GET",
        dataType: "json", 
		data: {codes: "SEM_C1"},
		success: function(data) {
			L.geoJSON(data['features'][0]).addTo(map);
        },
	 });
	 
});


