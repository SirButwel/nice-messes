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

  connect() {


    const that = this
    const s = p => {

      var pointCount = 150;
      var lissajousPoints = [];
      var freqX = 1;
      var freqY = 4;
      var phi = 0.5;

      var modFreqX = 3;
      var modFreqY = 2;

      var lineWeight = 0.4;
      var lineColor;
      var lineAlpha = 30;

      var connectionRadius = 80;
      var connectionRamp = 20;

      var coeffX = 1;
      var coeffY = 1;

      var modif = 0.0001;

      var realFramerate = 30

      var usedFramerate = 10;


      p.setup = function() {
        var canvas = p.createCanvas(300,300);
        canvas.parent('sketch-holder');
        p.colorMode(p.RGB, 755, 255, 255, 100);
        p.noFill();
        lineColor = p.color(27,44,193);
        calculateLissajousPoints();
        drawLissajous();
      };


      function animate() {
        modFreqX += 0.01;
        modFreqY += 0.01;
        coeffX += modif;
        if(coeffX > 1.25 || coeffX < 0.75) {
            modif *= -1 * (usedFramerate / realFramerate);
        }

      }
      function saveImages(){


      }
        p.draw = function () {
            animate();
            saveImages();
            calculateLissajousPoints();
            //updateLissajousPoints()
            drawLissajous();
        }


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
