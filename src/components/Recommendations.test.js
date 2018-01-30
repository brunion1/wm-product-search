import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon'
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Recommendations from './Recommendations';
const fetchRecommendations = sinon.spy(Recommendations.prototype, 'fetchRecommendations');

describe('<Recommendations>', () => {
    it('renders without crashing', () => {
        var div = document.createElement('div');
        ReactDOM.render( <Recommendations/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should call call fetchRecommendations when it receives props ', () => {
        const wrapper = shallow(<Recommendations itemId={1234}/>);
        expect(fetchRecommendations.calledOnce).toEqual(false);
        wrapper.setProps({itemId: 1});
        expect(fetchRecommendations.calledOnce).toEqual(true);
    });
});
