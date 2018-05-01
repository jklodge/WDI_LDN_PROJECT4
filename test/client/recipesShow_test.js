// /* global describe, it */
//
// import React from 'react';
// import { expect } from 'chai';
// import { shallow } from 'enzyme';
//
// import RecipesShow from '../../src/components/pages/RecipesShow';
//
// describe('RecipesShow tests', () => {
//
//   it('should render a h1, 2 images, 2 buttons, a modal, and 3 data sections', done => {
//     const props = {
//       history: {},
//       location: {},
//       match: {
//         isExact: true,
//         params: {
//           id: '123',
//           path: '/recipes/:id',
//           url: '/recipes/123'
//         }
//       }
//     };
//
//     const wrapper = shallow(<RecipesShow {...props} />);
//     expect(wrapper.find('h1').length).to.equal(1);
//     expect(wrapper.find('img').length).to.equal(2);
//     expect(wrapper.find('button').length).to.equal(2);
//     expect(wrapper.find('DataSection').length).to.equal(3);
//     expect(wrapper.childAt(4).hasClass('modal-container')).to.equal(true);
//     done();
//   });
// });
