import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon'
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Search from './Search';
const searchSpy = sinon.spy(Search.prototype, 'search');

const props = {
    match : {
        params : {
            searchTerm : "samsung"
        }
    }
};

const props2 = {
    match : {
        params : {
            searchTerm : "apple"
        }
    }
};

describe('<Search>', () => {
    beforeEach(() => {
        searchSpy.reset();
    });

    it('renders without crashing', () => {
        var div = document.createElement('div');
        ReactDOM.render( <Search {...props}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should call search() after the component mounts ', () => {
        const wrapper = shallow(<Search {...props} />);
        expect(searchSpy.calledOnce).toEqual(true);
    });

    it('should call search() after the component updates ', () => {
        const wrapper = shallow(<Search {...props} />);
        expect(searchSpy.calledOnce).toEqual(true);

        wrapper.setProps({...props2});

        expect(searchSpy.calledTwice).toEqual(true);
    });

});
