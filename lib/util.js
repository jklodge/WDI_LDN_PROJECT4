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
  'Leaf',
  'Dinner',
  'Supper',
  'Soup Bowl',
  'Dip',
  'Aluminium',
  'Can',
  'Canned Goods',
  'Tin',
  'Blossom',
  'Flower',
  'Flower Arrangement',
  'Flower Bouquet',
  'Ornament',
  'Furniture',
  'Tabletop',
  'Dessert',
  'Beverage',
  'Drink',
  'Alley',
  'Alleyway',
  'Building',
  'City',
  'Road',
  'Street',
  'Town',
  'Urban',
  'Automobile',
  'Car',
  'Transportation',
  'Vehicle',
  'Intersection'
];

function removeUnwantedWords(data) {
  return data.filter(foodName => !listOfSuppressedTerms.includes(foodName));
}

module.exports = {
  removeUnwantedWords
};
