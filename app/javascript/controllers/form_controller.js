import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="form"
export default class extends Controller {
  static targets = ["start", "end", "mode", "submit"]
  connect() {
    console.log("connected")
    console.log(this.element)
  }

  end() {
    this.endTarget.classList.remove("d-none")
  }
  mode() {
    this.modeTarget.classList.remove("d-none")
  }
  submit() {
    this.submitTarget.classList.remove('disabled')
  }
}
