###
  You can also write tests in JavaScript, see home-ctrl.spec.js
###

define ['angular-mocks', 'Source/modules/home/home-ctrl'], ->
  describe 'HomeController in app.home', ->
    scope = null
    subject = null

    beforeEach ->
      module 'app.home'

      inject ($rootScope, $controller) ->
        scope = $rootScope.$new();
        subject = $controller 'HomeController', { $scope: scope }

    describe 'check if controller is on it\'s place', ->
      it 'should have loaded the subject', ->
        expect(subject).toBeDefined()


    describe 'check if scope is also on it\'s place', ->
      it 'should test scope to be defined', ->
        expect(scope).toBeDefined()