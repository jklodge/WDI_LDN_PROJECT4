const listOfSuppressedTerms = [
  'Food',
  'Fruit',
  'Bowl',
  'Produce',
  'Flora',
  'Plant',
  'Vegetable',
  'Citrus Fruit',
  'Dish',
  'Meal',
  'Platter',
  'Plate',
  'Lunch',
  'Leaf'
];

function removeUnwantedWords(data) {
  return data.filter(foodName => !listOfSuppressedTerms.includes(foodName));
}

module.exports = {
  removeUnwantedWords
};
