const isNODE = typeof window === 'undefined'
let createCanvas, loadImage
if (isNODE) {
  createCanvas = require('canvas').createCanvas
  loadImage = require('canvas').loadImage
} else {
  loadImage = function (src) {
    return new Promise((resolve, reject) => {
      let image = new Image()

      image.setAttribute('crossOrigin', 'Anonymous')
      if (isLocalImage(src)) {
        image.src = src
      } else {
        image.src = 'https://images.weserv.nl/?url=' + src
      }

      if (image.complete) {
        resolve(image)
      } else {
        image.onload = function () {
          resolve(image)
        }
        image.onerror = () => {
          reject(new Error('load image error'))
        }
      }
    })
  }
}

function imageSclaer ({ imageUrl, scaleTo = 100, quality = 1, mimeType = 'jpeg' }) {
  return new Promise((resolve, reject) => {
    const correctmimeTypeList = isNODE ? ['jpeg', 'png'] : ['jpeg', 'png', 'webp']
    if (!correctmimeTypeList.includes(mimeType)) {
      reject(new Error('mimeType wrong ! '))
      return
    }

    loadImage(imageUrl).then(image => {
      handle(image)
    })

    function handle (image) {
      let canvas = isNODE ? createCanvas() : document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let originalWidth = image.width
      let originalHeight = image.height
      let scale = scaleTo / originalWidth
      let scaledWidth = Math.round(originalWidth * scale)
      let scaledHeight = Math.round(originalHeight * scale)

      canvas.width = scaledWidth
      canvas.height = scaledHeight
      ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight)

      if (isNODE) {
        let config = {}
        mimeType === 'jpeg' ? config.quality = quality : config.compressionLevel = quality
        canvas.toBuffer((err, buffer) => {
          if (err) {
            reject(err)
          } else {
            resolve(buffer)
          }
        }, 'image/' + mimeType, config)
      } else {
        canvas.toBlob(blob => {
          let url = window.URL.createObjectURL(blob)
          resolve({ blob, url })
        }, 'image/' + mimeType, quality)
      }
    }
  })
}

function isLocalImage (src) {
  if (src.includes('http')) {
    if (src.includes('localhost') || src.includes('192.168.1.10')) {
      return true
    } else {
      let getHostReg = /http(s)?:\/\/(.*?)\//
      let href = window.location.href
      if (href.match(getHostReg)[0] === src.match(getHostReg)[0]) {
        return true
      } else {
        return false
      }
    }
  } else {
    return true
  }
}

module.exports = imageSclaer
