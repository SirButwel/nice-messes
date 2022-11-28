import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="form"
export default class extends Controller {
  static targets = ["start", "end", "mode"]
  connect() {
    console.log("connected to form")
    console.log(this.submitTarget)
  }

  end() {
    this.endTarget.classList.remove("d-none")
  }
  mode() {
    this.modeTarget.classList.remove("d-none")
  }
  // submit() {
  //   this.submitTarget.setAttribute("disabled", "")
  // }
}
