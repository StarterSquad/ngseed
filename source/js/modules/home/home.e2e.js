describe('E2E: Testing App', function () {
  "use strict";

  beforeEach(function () {
    browser.get('/');
    browser.debugger();
  });

  describe('Home page', function () {
    it('should set test binding', function () {
      expect(element(by.css('body > div > span')).getText()).toEqual("It's as easy as 2 * 2 = 4");
    });
  });

});
