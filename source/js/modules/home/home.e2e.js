describe('E2E: Testing App', function () {

  beforeEach(function () {
    browser.get('/');
    browser.debugger();
  });

  describe('Home page', function () {
    it('should set test binding', function () {
      // find first h2 on a page
      expect(element(by.css('h2')).getText()).toEqual('Base layer');
    });
  });

});
