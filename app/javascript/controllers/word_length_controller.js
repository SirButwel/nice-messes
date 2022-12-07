import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="word-length"
export default class extends Controller {

  static targets = ["text"]

  connect() {
    console.log("connected")
    if (this.textTarget.text.length > 15)
    this.textTarget.text = this.textTarget.text.slice(0, 15)+ "..."
  }
}
