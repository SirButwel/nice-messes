import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    startLongitude: Number,
    startLatitude: Number,
    destinationLongitude: Number,
    destinationLatitude: Number,
    mode: String,
    distance: Number,
    duration: Number,
  }

  static targets = ["imageInput", "form"]

  connect() {

    console.log("connected to P5 controller");
    console.log(this.imageInputTarget)

    const that = this
    const s = p => {

      var pointCount = 500;
      var lissajousPoints = [];
      var freqX = that.durationValue;
      var freqY = 8;
      var phi = 1;

      var modFreqX = that.modeValue;
      var modFreqY = 2;

      var lineWeight = 0.5;
      var lineColor;
      var lineAlpha = 50;

      var connectionRadius = 100;
      var connectionRamp = 20;

      p.setup = function() {
        var canvas = p.createCanvas(600,600);
        canvas.parent('sketch-holder');
        p.colorMode(p.RGB, 755, 255, 255, 100);
        p.noFill();
        lineColor = p.color(27,44,193);
        calculateLissajousPoints();
        drawLissajous();

        const url = canvas.elt.toDataURL()
        console.log(url)
        that.canvas = canvas
      };

      function calculateLissajousPoints() {
        for (var i = 0; i <= pointCount; i++) {
          var angle = p.map(i, 0, pointCount, 0, p.TAU);

          var x = p.sin(angle * freqX + p.radians(phi)) * p.cos(angle * modFreqX);
          var y = p.sin(angle * freqY) * p.cos(angle * modFreqY);
          x *= p.width / 2 - 30;
          y *= p.height / 2 - 30;

          lissajousPoints[i] = p.createVector(x,y);
        }
      }

      function drawLissajous() {
        p.background(255);
        p.strokeWeight(lineWeight);
        p.push();
        p.translate(p.width / 2, p.height / 2);

        for (var i1 = 0; i1 < pointCount; i1++) {
          for (var i2 = 0; i2 < i1; i2++) {
            var d = lissajousPoints[i1].dist(lissajousPoints[i2]);
            var a = p.pow(1 / (d / connectionRadius + 1), 6);
            if (d <= connectionRadius) {
              p.stroke(lineColor, a * lineAlpha);
              p.line(
                lissajousPoints[i1].x,
                lissajousPoints[i1].y,
                lissajousPoints[i2].x,
                lissajousPoints[i2].y
              );
            }
          }
        }
        p.pop();
      }

    }

    new p5(s);
  }

  canvasSave(event) {
    event.preventDefault()
    console.log("SAVED!")
    const that = this

    // this.canvas.elt.toBlob((blob) => {
      // that.imageInputTarget.value = blob
    // });
      this.imageInputTarget.value = this.canvas.elt.toDataURL()


    // const formData = new FormData();

    // formData.append('json', this.json );

    // const csrfToken = document.getElementsByName("csrf-token")[0].content;
    // On vient fetcher l'url pattern/id/update en lui donnant le this.json en body pour lé récupérer dans le controller rails
    fetch(this.formTarget.action, {
      method: "PATCH", // Patch method to update our pattern
      headers: { "Accept": "application/json"},
      body: new FormData(this.formTarget)
    })
      // .then(response => response.json())
      // .then((data) => {
      //   console.log(data)
      // })

  }

}
