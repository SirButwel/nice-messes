import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="loading"
export default class extends Controller {
  static targets =["load"]
  connect() {
    console.log("loading connected")
    console.log(this.loadTarget)
  }

  goload() {
    console.log("gogogogo")
    this.loadTarget.classList.remove("d-none")
  }

}
