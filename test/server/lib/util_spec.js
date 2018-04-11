/* global , describe, it, expect */

const { removeUnwantedWords } = require('../../../lib/util');

const testData = ['Food', 'Fruit', 'Cheese', 'Produce', 'Egg', 'Plant', 'Avocado'];

describe('foodNameCleaner function', () => {

  it('should return an array without the suppressed terms', done => {
    expect(removeUnwantedWords(testData)).to.deep.equal(['Cheese', 'Egg', 'Avocado']);
    done();
  });
});
