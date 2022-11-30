import { Controller } from "@hotwired/stimulus"
// import { mapboxgl } from 'mapbox-gl';
// import { MapboxDirections } from '@mapbox/mapbox-gl-directions';
// var mapboxgl = require('mapbox-gl');
// var MapboxDirections = require('@mapbox/mapbox-gl-directions');


// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array,
    startLongitude: Number,
    startLatitude: Number,
    endLongitude: Number,
    endLatitude: Number,
  }
  connect() {
    console.log("connected to map")
    console.log(this.startLongitudeValue)
    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [2.3532147, 48.8563714],
      zoom: 9,
    });

    this.start = [this.startLongitudeValue, this.startLatitudeValue];
    this.end = [this.endLongitudeValue, this.endLatitudeValue];

    const bounds = [
      [this.startLongitudeValue, this.startLatitudeValue],
      [this.endLongitudeValue, this.endLatitudeValue]
    ];
    this.map.fitBounds(bounds);

    this.map.on('load', () => {

      this.getRoute();


    });

    // this.map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
    // mapboxgl: mapboxgl }))
    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.addControl(new mapboxgl.NavigationControl());

    // this.map.addControl(
    //   new MapboxDirections({
    //     accessToken: mapboxgl.accessToken,
    //     profile: 'mapbox/driving',
    //     unit: 'metric',
    //   }),
    //   'top-left'
    //   );

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
