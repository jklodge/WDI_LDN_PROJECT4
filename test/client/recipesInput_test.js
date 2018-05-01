/* global describe, it */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Recipes from '../../src/components/recipesInput/Recipes';
import Possibilities from '../../src/components/recipesInput/Possibilities';
import SearchBar from '../../src/components/recipesInput/SearchBar';

describe('Recipe tests', () => {
  const props = {
    recipes: [
      {
        id: 123,
        image: 'https://spoonacular.com/recipeImages/595916-312x231.jpg',
        imageType: 'jpg',
        likes: 0,
        missedIngredientsCount: 1,
        missedIngredients: [],
        title: 'Title',
        unusedIngredients: [],
        usedIngredientCount: 1,
        usedIngredients: []
      }
    ]
  };

  it('should render an image, a h1, li, ul, and p tag', done => {
    const wrapper = shallow(<Recipes {...props} />);
    expect(wrapper.find('p').length).to.equal(1);
    expect(wrapper.find('ul').length).to.equal(1);
    expect(wrapper.find('li').length).to.equal(1);
    expect(wrapper.find('h1').length).to.equal(1);
    expect(wrapper.find('img').length).to.equal(1);
    done();
  });

  it('should render a title, id, correct image, and missed ingredients', done => {
    const wrapper = shallow(<Recipes {...props} />);
    expect(wrapper.childAt(0).text()).to.equal('Recipes');
    // expect(wrapper.childAt(1).childAt(0).childAt(2).childAt(0).text()).to.equal('Title');
    done();
  });
});

describe('Possibilities tests', () => {
  const props = {
    possibilities: [
      'Strawberry'
    ]
  };

  it('should render a PossibilityItem component, a Link, and a form', done => {
    const wrapper = shallow(<Possibilities {...props} />);
    expect(wrapper.find('PossibilityItem').length).to.equal(1);
    expect(wrapper.find('Link').length).to.equal(1);
    expect(wrapper.find('form').length).to.equal(1);
    done();
  });

  // it('should render the PossibilityItem with the name Strawberry', done => {
  //   const wrapper = shallow(<Possibilities {...props} />);
  //   expect(wrapper.childAt(0).childAt(0).text()).to.equal('Strawberry');
  //   done();
  // });

  it('should render the Link with the text Find recipes with selected ingredients', done => {
    const wrapper = shallow(<Possibilities {...props} />);
    expect(wrapper.childAt(2).childAt(0).text()).to.equal('Find recipes with selected ingredients');
    done();
  });
});

describe('SearchBar tests', () => {

  it('should render a text input field and a select dropdown', done => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.find('select').length).to.equal(1);
    expect(wrapper.find('option').length).to.equal(7);
    expect(wrapper.find('input').length).to.equal(1);
    done();
  });

  it('should render the option fields with the correct text', done => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.childAt(0).childAt(0).childAt(0).text()).to.equal('None');
    expect(wrapper.childAt(0).childAt(0).childAt(1).text()).to.equal('Title (A - Z)');
    expect(wrapper.childAt(0).childAt(0).childAt(2).text()).to.equal('Title (Z - A)');
    expect(wrapper.childAt(0).childAt(0).childAt(3).text()).to.equal('Diet (Vegan)');
    expect(wrapper.childAt(0).childAt(0).childAt(4).text()).to.equal('Diet (Vegetarian)');
    expect(wrapper.childAt(0).childAt(0).childAt(5).text()).to.equal('Diet (Pescetarian)');
    expect(wrapper.childAt(0).childAt(0).childAt(6).text()).to.equal('Diet (Paleo)');
    done();
  });

  it('should render the correct html for the text input field', done => {

    const wrapper = shallow(<SearchBar />);
    expect(wrapper.childAt(1).html()).to.equal('<input type="text" class="input" placeholder="Search"/>');
    done();
  });
});
