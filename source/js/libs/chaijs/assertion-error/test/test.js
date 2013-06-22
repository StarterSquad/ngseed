suite(function (test, assert) {
  test('construction', function () {
    var err = new AssertionError();
    assert(err instanceof Error, 'instanceof Error');
    assert(err instanceof AssertionError, 'instanceof AssertionError');
    assert(err.name && err.name === 'AssertionError', 'name === "AssertionError"');
  });

  test('message', function () {
    var err = new AssertionError('Oops.')
      , empty = new AssertionError();
    assert(err.message === 'Oops.', 'w/ err.message');
    assert(empty.message === 'Unspecified AssertionError', 'w/o err.message');
  });

  test('custom properties', function () {
    var err = new AssertionError('good message', {
        name: 'ShouldNotExist'
      , hello: 'universe'
      , message: 'bad message'
      , stack: 'custom stack'
    });

    assert(err.name === 'AssertionError', 'does not overwrite name');
    assert(err.message === 'good message', 'does not overwrite message');
    assert(err.hello && err.hello === 'universe', 'has custom property');

    // some browsers don't have stack
    if (err.stack) {
      assert(err.stack && err.stack !== 'custom stack', 'does not overwrite stack');
    }
  });

  test('.toJSON()', function () {
    var err = new AssertionError('some message', {
        hello: 'universe'
      , goodbye: 'known'
    });

    var json = err.toJSON();

    assert(json.name === 'AssertionError', 'json has name');
    assert(json.message === 'some message', 'json has message');
    assert(json.hello === 'universe' && json.goodbye === 'known', 'json has custom properties');

    // some browsers don't have stack
    if (err.stack) {
      assert('string' === typeof json.stack, 'json has stack');
    }

    var nostack = err.toJSON(false);
    assert(!nostack.stack, 'no stack on false argument');
  });
});
