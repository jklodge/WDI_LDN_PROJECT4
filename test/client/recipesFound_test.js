// /* global describe, it */
//
// import React from 'react';
// import { expect } from 'chai';
// import { shallow } from 'enzyme';
//
// import RecipesFound from '../../src/components/pages/RecipesFound';
//
// describe('RecipesFound tests', () => {
//
//   it('should render a SearchBar container and 20 recipes container', done => {
//     const props = {
//       history: {},
//       location: {
//         hash: '',
//         key: '',
//         pathname: '',
//         search: '?ingredients=Strawberry'
//       },
//       match: {}
//     };
//
//     const wrapper = shallow(<RecipesFound {...props} />);
//     expect(wrapper.find('SearchBar').length).to.equal(1);
//     expect(wrapper.find('Recipes').length).to.equal(20);
//     done();
//   });
// });
