[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![CircleCI](https://circleci.com/gh/orleika/available-fonts.svg?style=shield&circle-token=e0f2f8002596ebddcb6e53da80ebfce4d7d9b03c)](https://circleci.com/gh/orleika/available-fonts)

# Available Fonts

Getting available fonts on browser without flash  
see [Demo Page](https://orleika.github.io/available-fonts/)

This methods based on http://www.lalit.org/lab/javascript-css-font-detect/


## Usage

simple
```
var testFonts = ['font family...'];
var availableFontsList = availableFonts(testFonts);
```

if you use our test fonts list, try below code.
```
(function() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var testFonts = JSON.parse(xhr.responseText).testfonts;
      var availableFontsList = availableFonts(testFonts);
      document.body.appendChild(document.createTextNode(availableFontsList.join(', ')));
    }
  };
  xhr.open('GET', 'testfonts.json');
  xhr.send();
}())
```

## Feature Works

* Optimize test fonts list for Browser Fingerprinting

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
