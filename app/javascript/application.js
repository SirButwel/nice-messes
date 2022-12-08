// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import "bootstrap"



const sr = ScrollReveal();

sr.reveal('.card', {
  duration: 1000,
  delay: 50,
  origin: 'top',
  distance: '45px',
  scale: 0.9,
}, 200)

sr.reveal('.text-anim', {
  duration: 1500,
  delay: 200,
  origin: 'top',
  distance: '20px',
  scale: 0.8,
  reset: true
})

sr.reveal('.journey-form', {
  duration: 1500,
  delay: 400,
  origin: 'top',
  distance: '20px',
  scale: 0.8,
  reset: true
})
sr.reveal('.li-item-index', {
  duration: 1000,
  delay: 50,
  origin: 'top',
  distance: '45px',
  scale: 0.9,
})
