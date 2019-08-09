var imageScaler = require('./lib/imageScaler.js')

if (typeof window !== 'undefined') {
  window.imageScaler = imageScaler
}

module.exports = imageScaler
