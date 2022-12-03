import { Controller } from "@hotwired/stimulus"
import MapboxGeocoder from "@nice-messes/mapbox-gl-geocoder"

// Connects to data-controller="address-autocomplete"
export default class extends Controller {
  static values = { apiKey: String }

  static targets = ["start"]

  connect() {

    console.log("autocomplete connected")
    console.log(this.startTarget)


    this.geocoder = new MapboxGeocoder({
      accessToken: this.apiKeyValue,
      types: "country,region,place,postcode,locality,neighborhood,address"
    })
    this.geocoder.addTo(this.element)

    this.geocoder.on("result", event => this.#setInputValue(event))
    this.geocoder.on("clear", () => this.#clearInputValue())

  }

  #setInputValue(event) {
    this.startTarget.value = event.result["place_name"]
  }

  #clearInputValue() {
    this.startTarget.value = ""
  }


  disconnect() {
    this.geocoder.onRemove()
  }
}
