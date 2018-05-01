// /* global describe, it */
//
// import React from 'react';
// import { expect } from 'chai';
// import { shallow } from 'enzyme';
//
// import RecipesFavourite from '../../src/components/pages/RecipesFavourite';
//
// describe('RecipesFavourite tests', () => {
//
//   it('should render 1 h1, and 1 p tag', done => {
//     const wrapper = shallow(<RecipesFavourite />);
//     expect(wrapper.find('h1').length).to.equal(1);
//     expect(wrapper.find('p').length).to.equal(1);
//     done();
//   });
//
//   it('should render the correct html', done => {
//     const wrapper = shallow(<RecipesFavourite />);
//     expect(wrapper.childAt(0).childAt(0).text()).to.equal('Favourites');
//     expect(wrapper.childAt(1).html()).to.equal('{this.state.user.favourites.map((favourite, i) => <p key={i}>{favourite.title}</p>)}');
//     done();
//   });
// });
