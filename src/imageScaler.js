function imageSclaer ({ imageUrl, scaleTo = 100, quality = 1, mimeType = 'jpeg' }) {
  return new Promise((resolve, reject) => {
    const correctmimeTypeList = ['jpeg', 'png', 'webp']
    if (!correctmimeTypeList.includes(mimeType)) {
      reject(new Error('mimeType wrong ! '))
      return
    }

    let image = new Image()
    image.src = isLocalImage(imageUrl) ? imageUrl : 'https://images.weserv.nl/?url=' + imageUrl
    image.setAttribute('crossOrigin', 'Anonymous')

    if (image.complete) {
      handle()
    } else {
      image.onload = handle
    }
    image.onerror = () => {
      reject(new Error('load image error'))
    }

    function handle () {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let originalWidth = image.width
      let originalHeight = image.height
      let scale = scaleTo / originalWidth
      let scaledWidth = Math.round(originalWidth * scale)
      let scaledHeight = Math.round(originalHeight * scale)

      canvas.width = scaledWidth
      canvas.height = scaledHeight
      ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight)

      canvas.toBlob(blob => {
        let url = window.URL.createObjectURL(blob)
        resolve({ blob, url })
      }, 'image/' + mimeType, quality)
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
