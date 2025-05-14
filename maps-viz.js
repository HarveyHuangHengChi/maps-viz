function draw(data, element, config) {
  const apiKey = config.API_KEY;

  const rows = data.getRows().map(r => ({
    name: r.dimensions[0].value,
    lat: parseFloat(r.dimensions[1].value),
    lng: parseFloat(r.dimensions[2].value),
    brand: r.dimensions[3].value
  }));

  const map = new google.maps.Map(element, {
    center: { lat: rows[0].lat, lng: rows[0].lng },
    zoom: 13
  });

  const iconMap = {
    "7-11": "https://upload.wikimedia.org/wikipedia/commons/4/44/7-eleven_logo.svg",
    "FamilyMart": "https://upload.wikimedia.org/wikipedia/commons/7/72/FamilyMart_logo_2016.svg",
    "OK": "https://upload.wikimedia.org/wikipedia/commons/e/ef/OK_Mart_logo.svg"
  };

  rows.forEach(s => {
    new google.maps.Marker({
      position: { lat: s.lat, lng: s.lng },
      map,
      title: s.name,
      icon: {
        url: iconMap[s.brand] || iconMap["7-11"],
        scaledSize: new google.maps.Size(32, 32)
      }
    });
  });
}

window.dscc = window.dscc || {};
window.dscc.registerVisualization(draw);