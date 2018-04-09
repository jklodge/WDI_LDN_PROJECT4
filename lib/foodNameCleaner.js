function foodNameCleaner(foodName) {
  const listOfSuppressedTerms = ['Food', 'Fruit', 'Bowl', 'Produce', 'Flora', 'Plant', 'Vegetable', 'Citrus Fruit', 'Dish', 'Meal', 'Platter', 'Plate', 'Lunch', 'Leaf'];
  return listOfSuppressedTerms.indexOf(foodName) === -1;
}

module.exports = {
  foodNameCleaner
};
