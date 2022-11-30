import { Controller } from "@hotwired/stimulus"
// import { mapboxgl } from 'mapbox-gl';
// import { MapboxDirections } from '@mapbox/mapbox-gl-directions';
// var mapboxgl = require('mapbox-gl');
// var MapboxDirections = require('@mapbox/mapbox-gl-directions');


// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array
  }
  connect() {
    console.log("connected to map")
    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [2.3518372, 48.85671259999999],
      zoom: 13
    });

    this.start = [2.3518372, 48.85671259999999];
    this.end = [-1.5534968, 47.2183308];


    this.map.on('load', () => {

      this.getRoute();


    });











    // this.map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
    // mapboxgl: mapboxgl }))
    // this.map.addControl(new mapboxgl.FullscreenControl());
    // this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        profile: 'mapbox/cycling',
        unit: 'metric',
        // coordinates: [{longitude: 2.3518372},{latitude: 48.85671259999999};{longitude: -1.5534968},{latitude: 47.2183308}],

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
  async getRoute() {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${this.start[0]},${this.start[1]};${this.end[0]},${this.end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
      );
      const json = await query.json();
      const data = json.routes[0];
      const route = data.geometry.coordinates;
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route,
        }
      };
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    }
}
