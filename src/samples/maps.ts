$(document).ready(() => {
    var map_conf: sico.maps.IMapOptions = {
        element: document.getElementById("gmap_canvas"),
        title: 'Name',
        titleShow: true,
        location: new google.maps.LatLng(27.988029, 86.925019),
        marker: [
          {
            position: new google.maps.LatLng(27.974083, 86.930080),
            html: '<span class="map-icon map-icon-parking"></span>',
            icon: {
              path: sico.maps.SQUARE,
              fillColor: "#56021a",
              fillOpacity: 1,
              strokeColor: "",
              strokeWeight: 0
            },
          },
          {
            position: new google.maps.LatLng(27.974083, 86.930088),
            html: '<span class="map-icon map-icon-parking"></span>',
            icon: {
              path: sico.maps.SQUARE,
              fillColor: "#56021a",
              fillOpacity: 1,
              strokeColor: "",
              strokeWeight: 0
            },
          },
        ],
        direction: {
          origin: new google.maps.LatLng(27.968776, 86.918707),
          destination: new google.maps.LatLng(27.988029, 86.925019),
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: [{
            location: new google.maps.LatLng(27.974083, 86.930080),
            stopover: false
          },
          {
            location: new google.maps.LatLng(27.974083, 86.930088),
            stopover: false
          },
          ]
        },
        rectangles: [
          {
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            bounds: {
              north: 49.245327,
              south: 49.245094,
              east: 6.889920,
              west: 6.889396
            }
          }
        ],
        polygons: [
          {
            clickable: false,
            draggable: false,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            paths: [
              new google.maps.LatLng(27.974083, 86.930080),
              new google.maps.LatLng(27.968776, 86.918707),
              new google.maps.LatLng(27.972353, 86.911384),
              new google.maps.LatLng(27.980122, 86.902028),
              new google.maps.LatLng(27.987890, 86.924902),
            ]
          }
        ],
      };

      let map_main = new sico.maps.Map(map_conf);
      map_main.draw();
});
