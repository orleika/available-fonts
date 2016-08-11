(function (root, name, definition) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = definition;
  } else {
    root[name] = definition;
  }
}(this, 'availableFonts', function (testFonts) {
  var baseFonts = ['monospace', 'sans-serif', 'serif'];
  var testString = 'mmmmmmmmmmlli';
  var testFontSize = '72px';
  var ctx = document.getElementsByTagName('body')[0];
  var baseCtx = document.createElement('div');
  var testCtx = document.createElement('div');

  /**
   * detection a font is available
   * @param  array   baseSizes
   * @param  object  testSizes
   * @return boolean
   */
  var available = function (baseSizes, testSizes) {
    return baseSizes.some(function (baseSize) {
      return testSizes.every(function (testSize) {
        return baseSize.width !== testSize.width || baseSize.height !== testSize.height;
      });
    });
  };

  // create unvisible element
  var span = function () {
    var s = document.createElement('span');
    s.style.fontSize = testFontSize;
    s.style.position = 'absolute';
    s.style.left = '-9999px';
    s.innerHTML = testString;
    return s;
  };

  var baseSizes = (function () {
    var render = function (font) {
      var s = span();
      s.style.fontFamily = font;
      baseCtx.appendChild(s);
      return s;
    };
    var spans = baseFonts.map(function (baseFont) {
      return render(baseFont);
    });
    ctx.appendChild(baseCtx);
    var sizes = spans.map(function (s) {
      return {width: s.offsetWidth, height: s.offsetHeight};
    });
    ctx.removeChild(baseCtx);
    return sizes;
  }());

  var testSizesList = (function () {
    var renders = function (testFont) {
      var render = function (baseFont) {
        var s = span();
        s.style.fontFamily = "'" + testFont + "'," + baseFont;
        testCtx.appendChild(s);
        return s;
      };
      var spans = baseFonts.map(function (baseFont) {
        return render(baseFont);
      });
      return {name: testFont, spans: spans};
    };
    var spansList = testFonts.map(function (testFont) {
      return renders(testFont);
    });
    ctx.appendChild(testCtx);
    var sizesList = spansList.map(function (list) {
      var sizes = list.spans.map(function (s) {
        return {width: s.offsetWidth, height: s.offsetHeight};
      });
      return {name: list.name, sizes: sizes};
    });
    ctx.removeChild(testCtx);
    return sizesList;
  }());

  return testSizesList.filter(function (test) {
    return available(baseSizes, test.sizes);
  }).map(function (available) {
    return available.name;
  });
}));
