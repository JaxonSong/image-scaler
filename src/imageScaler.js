function imageSclaer ({ imageUrl, scaleTo, quality = 0.7, isLocalImage, output }) {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    let image = new Image()
    image.src = isLocalImage ? imageUrl : 'https://images.weserv.nl/?url=' + imageUrl
    image.setAttribute('crossOrigin', 'Anonymous') // 设置图片允许跨域
    image.onload = () => {
      let originalWidth = image.width
      let originalHeight = image.height
      let scale = scaleTo / image.width || 100 / image.width
      let tiniedWidth = Math.round(originalWidth * scale)
      let tiniedHeight = Math.round(originalHeight * scale)
      canvas.width = tiniedWidth
      canvas.height = tiniedHeight
      ctx.drawImage(image, 0, 0, tiniedWidth, tiniedHeight)
      if (output === 'blob') {
        canvas.toBlob(blob => {
          resolve(blob)
        }, 'image/jpeg', quality)
      } else {
        let tiniedImageUrl = canvas.toDataURL('image/jpeg', quality)
        resolve(tiniedImageUrl)
      }
    }
    image.onerror = () => {
      reject(new Error('load image error'))
    }
  })
}

module.exports = imageSclaer
