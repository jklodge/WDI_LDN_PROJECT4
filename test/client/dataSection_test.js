/* global describe, it */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import DataSection from '../../src/components/recipesShow/DataSection';

describe('DataSection tests', () => {

  it('should render 1 li', done => {
    const wrapper = shallow(<DataSection />);
    expect(wrapper.find('li').length).to.equal(1);
    done();
  });

  it('should render the correct header', done => {
    const props = {
      header: 'Steps'
    };

    const wrapper = shallow(<DataSection {...props} />);
    expect(wrapper.childAt(0).childAt(0).text()).to.equal('Steps');
    done();
  });
});
