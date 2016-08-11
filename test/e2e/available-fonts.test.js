const webdriverio = require('webdriverio');
const test = require('tape');

const browser = webdriverio.remote({
  desiredCapabilities: {
    browserName: 'chrome'
  }
});

test('should show available fonts', function (t) {
  t.plan(1);
  browser
    .init()
    .url('http://127.0.0.1:8080')
    .waitForText('body', 20000)
    .getText('body')
    .then(function (fonts) {
      t.ok(fonts.length, fonts);
    })
    .end();
});
