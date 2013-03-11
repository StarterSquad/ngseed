/**

 As the application runs in an iframe,
 if you access the angular object from the JavaScript console,
 it's the scenario runner's one, not the application's one.

 You can refer to the angular object of the iframe window object using this verbose syntax :
 document.getElementsByTagName('iframe')[0].contentWindow.angular.element("#app")

 Adding these two functions in the scenarios.js file will help :
 function appWindow() {
  return document.getElementsByTagName('iframe')[0].contentWindow;
 }
 function appAngular() {
  return appWindow().angular;
 }

 Now appWindow() and appAngular() will return respectively the application's window and angular object.
 For instance :
 appAngular().element("#content").scope()

 And I have no problem in using breakpoints and watches in Chrome JS debugger.

*/

function appAngular() {
    return document.getElementsByTagName('iframe')[0].contentWindow.angular;
}

describe('Test app', function () {
    "use strict";

    describe('home page', function () {
        describe('search bar', function () {
            // FIXME so we can't use two async dsl scenarios without page reloading
            beforeEach(function() {
                browser().navigateTo('/source/index.html');
            });
        });
    });

});
