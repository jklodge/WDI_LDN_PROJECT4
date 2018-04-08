function foodNameCleaner(foodName) {
  const listOfSupressedTerms = ['Food', 'Fruit', 'Bowl', 'Produce', 'Flora', 'Plant', 'Vegetable', 'Citrus Fruit'];
  return listOfSupressedTerms.indexOf(foodName) === -1;
}

module.exports = {
  foodNameCleaner
};
