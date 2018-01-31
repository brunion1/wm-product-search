import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon'
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import history from '../utils/history';
const filterSpy = sinon.spy(history, 'push');

import Header from './Header';

describe('<Header>', () => {
    it('renders without crashing', () => {
        var div = document.createElement('div');
        ReactDOM.render( <Header/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should update state when a search string is entered ', () => {
        var searchString = 'television';
        var wrapper = mount(<Header/>);

        var input = wrapper.find('input');
        input.simulate('change', { target: { value: searchString } });
        expect(wrapper.state().searchString).toEqual(searchString);
    });

    it('should invoke the history.push function upon form submission ', () => {
        var wrapper = mount(<Header/>);
        var form = wrapper.find('form');

        expect(history.push.calledOnce).toBe(false);

        form.simulate('submit');

        expect(history.push.calledOnce).toBe(true);
    });

});
