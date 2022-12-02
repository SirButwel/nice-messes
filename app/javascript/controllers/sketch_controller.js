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
    test: String
  }

  connect() {
    console.log("connected to P5 controller");
    const that = this


    const s = p => {

      var pointCount = 500;
      var lissajousPoints = [];
      var freqX = 4;
      var freqY = 8;
      var phi = 75;

      var modFreqX = 3;
      var modFreqY = 2;

      var lineWeight = 0.5;
      var lineColor;
      var lineAlpha = 50;

      var connectionRadius = 100;
      var connectionRamp = 20;

      p.setup = function() {
        var canvas = p.createCanvas(800,800);
        canvas.parent('sketch-holder');
        p.colorMode(p.RGB, 755, 255, 255, 100);
        p.noFill();
        lineColor = p.color(27,44,193);
        calculateLissajousPoints();
        drawLissajous();
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
}
