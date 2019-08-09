'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function imageSclaer(_ref) {
  var imageUrl = _ref.imageUrl,
      scaleTo = _ref.scaleTo,
      _ref$quality = _ref.quality,
      quality = _ref$quality === undefined ? 0.7 : _ref$quality,
      isLocalImage = _ref.isLocalImage,
      output = _ref.output;

  return new _promise2.default(function (resolve, reject) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var image = new Image();
    image.src = isLocalImage ? imageUrl : 'https://images.weserv.nl/?url=' + imageUrl;
    image.setAttribute('crossOrigin', 'Anonymous'); // 设置图片允许跨域
    image.onload = function () {
      var originalWidth = image.width;
      var originalHeight = image.height;
      var scale = scaleTo / image.width || 100 / image.width;
      var tiniedWidth = Math.round(originalWidth * scale);
      var tiniedHeight = Math.round(originalHeight * scale);
      canvas.width = tiniedWidth;
      canvas.height = tiniedHeight;
      ctx.drawImage(image, 0, 0, tiniedWidth, tiniedHeight);
      if (output === 'blob') {
        canvas.toBlob(function (blob) {
          resolve(blob);
        }, 'image/jpeg', quality);
      } else {
        var tiniedImageUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(tiniedImageUrl);
      }
    };
    image.onerror = function () {
      reject(new Error('load image error'));
    };
  });
}

module.exports = imageSclaer;