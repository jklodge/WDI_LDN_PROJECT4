![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# GA WDI-32 Project 4 - Snappy Food

For our final project, we were given a week to build a MERN Stack web application that allowed users to log in, and used third party APIs to display some data.

#### [Visit website](https://snappy-food.herokuapp.com/) on mobile or desktop for best viewing experience.

---

###### Snappy Food is a web application where users can upload a picture of ingredients, and receive a list of recipes containing those ingredients. The ingredients are then printed onto the screen, and the user can uncheck the items they do not have, and input any that the API did not find.

<p align="center"><img src="https://i.imgur.com/8zDATWr.png" width="700"></p>

After uploading an image and inputting ingredients, the user is taken to an index of recipes, where they can filter by diet, and search for a specific word in the list. They can then choose a recipe, and they will see a new page that gives information about the recipe in a modal, and has details on the method and ingredients for the recipe. They will also see a shopping list, which shows the ingredients they don't have. The user can save recipes to be view later.

<p align="center"><img src="https://i.imgur.com/ToNHN7z.png" width="700"></p>

The app is optimised for mobile, as it was designed mobile-first. If using mobile, instead of a drop-zone to drag and drop the image onto, the user can upload a photo using their camera. The styling here is still a work in progress.

<p align="center"><img src="https://i.imgur.com/UQGyq9t.jpg" width="700"></p>

##### API Information

The AWS Rekognition API was installed using SDK. Originally it had an image upload limit, but I changed this to 5MB so that users could upload photos using their phone camera. The list that AWS Rekognition returns is often quite broad, so I wrote some middleware in the backend so that this list is filtered, removing words such as "Produce" and "Food".

The list is then sent using a request-promise straight to the Spoonacular API, which provides a list of recipes based on the ingredients from the list in the previous step. The recipes are displayed in an index-like format, and can be filtered by making a new request to the API. The ingredients are held in the query string of the URL, allowing users to use the back button in the browser to go back to the index of recipes once they have clicked to a different page.

In order to show the recipe details, another request is made to the ID of that recipe, using another request-promise. The user can save recipes, which adds it to an array attached to the user in the database.

<p align="center"><img src="" width="700"></p>



---
##### Moving Forward

Overall I am pleased with the final product. If I had more time, I would have made it so that users could input their allergy information and ingredients they would like to be excluded from the search. I would also like to add a function so that more than 20 recipes could be loaded on request.

Additionally, I would include a groceries API so that the shopping list can have comparable real-time prices attached. I would also like to improve upon the general design of the app.

These, along with some bug fixes such as being able to remove saved recipes from their profile, are things I intend to work on in the coming weeks.

## Setup instructions

1. Clone or download the repo
2. Install dependencies with `yarn install`
3. Launch the app with `yarn start:server` and `yarn start:client`
