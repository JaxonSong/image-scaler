'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function imageSclaer(_ref) {
  var imageUrl = _ref.imageUrl,
      _ref$scaleTo = _ref.scaleTo,
      scaleTo = _ref$scaleTo === undefined ? 100 : _ref$scaleTo,
      _ref$quality = _ref.quality,
      quality = _ref$quality === undefined ? 1 : _ref$quality,
      _ref$mimeType = _ref.mimeType,
      mimeType = _ref$mimeType === undefined ? 'jpeg' : _ref$mimeType;

  return new _promise2.default(function (resolve, reject) {
    var correctmimeTypeList = ['jpeg', 'png', 'webp'];
    if (!correctmimeTypeList.includes(mimeType)) {
      reject(new Error('mimeType wrong ! '));
      return;
    }

    var image = new Image();
    image.src = isLocalImage(imageUrl) ? imageUrl : 'https://images.weserv.nl/?url=' + imageUrl;
    image.setAttribute('crossOrigin', 'Anonymous');

    if (image.complete) {
      handle();
    } else {
      image.onload = handle;
    }
    image.onerror = function () {
      reject(new Error('load image error'));
    };

    function handle() {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var originalWidth = image.width;
      var originalHeight = image.height;
      var scale = scaleTo / originalWidth;
      var scaledWidth = Math.round(originalWidth * scale);
      var scaledHeight = Math.round(originalHeight * scale);

      canvas.width = scaledWidth;
      canvas.height = scaledHeight;
      ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight);

      canvas.toBlob(function (blob) {
        var url = window.URL.createObjectURL(blob);
        resolve({ blob: blob, url: url });
      }, 'image/' + mimeType, quality);
    }
  });
}

function isLocalImage(src) {
  if (src.includes('http')) {
    if (src.includes('localhost') || src.includes('192.168.1.10')) {
      return true;
    } else {
      var getHostReg = /http(s)?:\/\/(.*?)\//;
      var href = window.location.href;
      if (href.match(getHostReg)[0] === src.match(getHostReg)[0]) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return true;
  }
}

module.exports = imageSclaer;