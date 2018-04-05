const AWS = require('aws-sdk');
const Promise = require('bluebird');
const rp = require('request-promise');

const rekognition = new AWS.Rekognition({
  accessKeyId: process.env.REKOGNITION_API_KEY,
  secretAccessKey: process.env.REKOGNITION_API_SECRET,
  region: 'eu-west-1'
});

const spoonacular = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes';

function getLabels(req, res, next) {
  // convert image into base64 as required by AWS rekognition
  const imageData = req.body.image.match(/.+base64,(.+)/)[1];
  const buffer = new Buffer(imageData, 'base64');

  // create promise to get the data from AWS rekognition
  return new Promise((resolve, reject) => {
    rekognition.detectLabels({
      Image: { Bytes: buffer },
      MaxLabels: 123
    }, (err, data) => {
      if(err) return reject(err);
      return resolve(data);
    });
  })
    .then(data => data.Labels.map(label => label.Name))
    // use request-promise to send the data from AWS rekognition to the spoonacular API to find recipes by ingredients
    .then(labels => rp({
      url: `${spoonacular}/findByIngredients`,
      // data from rekognition returned an array, spoonacular API query string needs a list separated by commas
      qs: {
        ingredients: labels.join(',').toLowerCase()
      },
      // spoonacular API key goes in the header of the request
      headers: {
        'Accept': 'application/json',
        'X-Mashape-Key': process.env.SPOONACULAR_API_KEY
      },
      json: true,
      method: 'GET'
    }))
    // send the reponse to the frontend
    .then(response => res.json(response))
    .catch(next);
}

// using request-promise to get the id from the above response, and find the recipe using this id
function getRecipeById(req, res, next) {
  rp({
    url: `${spoonacular}/${req.params.id}/information`,
    qs: {
      includeNutrition: 'false'
    },
    headers: {
      'Accept': 'application/json',
      'X-Mashape-Key': process.env.SPOONACULAR_API_KEY
    },
    json: true,
    method: 'GET'
  })
    .then(response => res.json(response))
    .catch(next);
}

module.exports = {
  getLabels,
  getRecipeById
};
