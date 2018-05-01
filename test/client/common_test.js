/* global describe, it */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import NotFound from '../../src/components/common/NotFound';

describe('NotFound tests', () => {

  it('should render a h1 with the text "404: Not Found"', done => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.text()).to.equal('404: Not Found');
    done();
  });
});
