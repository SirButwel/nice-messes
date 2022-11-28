import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array
  }
  connect() {
    console.log("connected to map")
    // console.log(this.apiKeyValue)
    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [-79.4512, 43.6568],
      zoom: 13
    });
    this.map.addControl(
      new MapboxDirections({
          accessToken: mapboxgl.accessToken
      }),
      'top-left'
    );


//     var mapboxgl = require('mapbox-gl');
// var MapboxDirections = require('@mapbox/mapbox-gl-directions');

// var directions = new MapboxDirections({
//   accessToken: 'YOUR-MAPBOX-ACCESS-TOKEN',
//   unit: 'metric',
//   profile: 'mapbox/cycling'
// });

// var map = new mapboxgl.Map({
//   container: 'map',
//   style: 'mapbox://styles/mapbox/streets-v9'
// });

// map.addControl(directions, 'top-left');
  }
}
