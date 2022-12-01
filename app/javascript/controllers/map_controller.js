import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array,
    startLongitude: Number,
    startLatitude: Number,
    endLongitude: Number,
    endLatitude: Number,
    mode: String
  }

  static targets = ["instuctions"]

  connect() {
    console.log("connected to map")
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

    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.addControl(new mapboxgl.NavigationControl());

  }
  async getRoute() {

    let mode = ""
    if (this.modeValue === "driving") {
      mode = "driving-traffic"
    }
    else if (this.modeValue === "walking") {
      mode = "walking"
    }
    else {
      mode = "cycling"
    }
    console.log(mode)
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/${mode}/${this.start[0]},${this.start[1]};${this.end[0]},${this.end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
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

        const instructions = document.getElementById('instructions');
        const steps = data.legs[0].steps;

      let tripInstructions = '';
      for (const step of steps) {
      tripInstructions += `<li>${step.maneuver.instruction}</li>`;
      }
      instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
        data.duration / 60
      )} min </strong></p><ol>${tripInstructions}</ol>`;
      }
  }
