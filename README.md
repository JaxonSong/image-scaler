# image-scaler

**A JavaScript tool that enlarges and reduces the size of the image.😎**

## Features
- Reduce image size
- Zoom in picture
- Zoom out image

## Installing
### Using npm:
```shell
  $ npm install @jaxon_song/image-scaler
```
### Using cdn:
```javascript
  <script src="https://unpkg.com/@jaxon_song/image-scaler/dist/bundle.min.js"></script>
```

## Usage
```javascript
  const imageScaler = require('@jaxon_song/image-scaler')

  imageScaler({
    // Original image url
    imageUrl: [url],
    // How much is the picture width adjusted(px)? The default value is 100.
    scaleTo: 150,
    // A Number between 0 and 1 indicating image quality if the requested type is image/jpeg or image/webp. If this argument is anything else, the default values 0.92 and 0.80 are used for image/jpeg and image/webp respectively. Other arguments are ignored.
    quality: 0.1,
    // A DOMString indicating the image format. The default type is image/jpeg.
    mimeType: 'png'
  }).then( data => {
    // data includes the blob object and url of the adjusted image
    console.log(data)
  })
```

## License
MIT